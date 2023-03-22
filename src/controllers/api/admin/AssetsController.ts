import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import AssetModel from '@models/assets';
import { NoData } from '@libs/errors';
import settings from '@configs/settings';
import sequelize from '@initializers/sequelize';
import AssetResources from '@models/assetResources';
import { Sequelize } from 'sequelize';
import CategoryModel from '@models/categories';

class AssetsController {
  public async create (req: Request, res: Response) {
    try {
      const assetParams = req.parameters.permit(AssetModel.CREATABLE_PARAMETERS).value();
      const listAssetParams: any[] = [];
      const listMedias: any[] = [];
      const MediasAttributes:any[] = [];
      assetParams.status = AssetModel.STATUS_ENUM.SPARE;
      let amount = req.body.amount;
      const previousAsset = await AssetModel.scope(
        { method: ['byCategory', assetParams.categoryId] }).findOne({
        attributes: [[Sequelize.fn('max', Sequelize.col('code')), 'max']],
      });
      const data = JSON.stringify(previousAsset);
      let max = parseInt(data.slice(-6, data.length - 2));
      const category = await CategoryModel.findByPk(assetParams.categoryId);
      const prefix = category.prefix;
      if (data === '{"max":null}') {
        max = 0;
      };
      while (amount) {
        max++;
        const code = (prefix + ('0000' + max.toString()).slice(-4));
        listAssetParams.push({ ...assetParams, code: code });
        amount--;
      }

      const result = await sequelize.transaction(async (transaction) => {
        const assets = await AssetModel.bulkCreate(listAssetParams, { individualHooks: true, transaction });
        for (const asset of assets) {
          listMedias.push(...assetParams.medias);
          const media = listMedias.pop();
          MediasAttributes.push({ ...media, assetId: asset.id });
        }
        await AssetResources.bulkCreate(MediasAttributes, { individualHooks: true, transaction });
        return assets;
      });
      sendSuccess(res, { assets: result });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const { freeWord, status, categoryId, type } = req.query;
      const sortBy = req.query.sortBy || 'id';
      const sortOrder = req.query.sortOrder || 'DESC';
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [
        { method: ['bySort', sortBy, sortOrder] },
        'withCategory',
        'withUserName',
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); }
      if (status) { scopes.push({ method: ['byStatus', status] }); }
      if (type) { scopes.push({ method: ['byType', type] }); }
      if (categoryId) { scopes.push({ method: ['byCategory', categoryId] }); }
      const { count, rows } = await AssetModel.scope(scopes).findAndCountAll({
        limit,
        offset,
      });
      sendSuccess(res, { rows, pagination: { total: count, page, perPage: limit } });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async show (req: Request, res: Response) {
    try {
      const asset = await AssetModel.scope('withResources').findByPk(req.params.assetId);
      if (!asset) { return sendError(res, 404, NoData); }
      asset.setDataValue('category', await asset.getCategory());
      sendSuccess(res, { asset });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const { assetId } = req.params;
      const asset = await AssetModel.findByPk(assetId);
      if (!asset) return sendError(res, 404, NoData);
      await asset.destroy();
      sendSuccess(res, { });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const { assetId } = req.params;
      const asset = await AssetModel.findByPk(assetId);
      if (!asset) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(AssetModel.UPDATABLE_PARAMETERS).value();
      await sequelize.transaction(async (transaction) => {
        await asset.update(params, { transaction });
        await asset.updateMedia(params.medias, transaction);
      });
      sendSuccess(res, { asset });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new AssetsController();
