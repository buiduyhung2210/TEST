import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import AssetRequestModel from '@models/assetRequests';
import { NoData } from '@libs/errors';
import settings from '@configs/settings';

class AdminAssetRequestController {
  public async index (req: Request, res: Response) {
    try {
      const { freeWord, status, dateFrom, dateTo } = req.query;
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [
        'withUser',
        'withAdminName',
        'withCategoryName',
      ];
      if (dateFrom && dateTo) { scopes.push({ method: ['byCreatedAt', dateFrom, dateTo] }); };
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); };
      if (status) { scopes.push({ method: ['byStatus', status] }); };
      const { count, rows } = await AssetRequestModel.scope(scopes).findAndCountAll({
        limit,
        offset,
        distinct: true,
        col: 'AssetRequestModel.id',
      });
      sendSuccess(res, { rows, pagination: { total: count, page, perPage: limit } });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async show (req: Request, res: Response) {
    try {
      const assetRequest = await AssetRequestModel.scope(['withAssetName',
        'withAdminName',
        'withHistory',
        'withCategoryName']).findByPk(req.params.assetRequestId);
      if (!assetRequest) { return sendError(res, 404, NoData); }
      sendSuccess(res, { assetRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async approve (req: Request, res: Response) {
    try {
      const { assetRequestId } = req.params;
      const assetRequest = await AssetRequestModel.findByPk(assetRequestId);
      if (!assetRequest) { return sendError(res, 404, NoData); }
      await assetRequest.update({ status: AssetRequestModel.STATUS_ENUM.PROCESSING });
      sendSuccess(res, { assetRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async deny (req: Request, res: Response) {
    try {
      const { assetRequestId } = req.params;
      const assetRequest = await AssetRequestModel.findByPk(assetRequestId);
      if (!assetRequest) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(AssetRequestModel.ADMIN_DENIED_PARAMETERS).value();
      params.status = AssetRequestModel.STATUS_ENUM.DENIED;
      await assetRequest.update(params);
      sendSuccess(res, { assetRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const { assetRequestId } = req.params;
      const assetRequest = await AssetRequestModel.findByPk(assetRequestId);
      if (!assetRequest) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(AssetRequestModel.UPDATABLE_PARAMETERS).value();
      if (params.assetId) {
        params.status = AssetRequestModel.STATUS_ENUM.PROCESSED;
        assetRequest.assetId = params.assetId;
        await assetRequest.updateAsset();
      }
      await assetRequest.update(params);
      sendSuccess(res, { assetRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new AdminAssetRequestController();
