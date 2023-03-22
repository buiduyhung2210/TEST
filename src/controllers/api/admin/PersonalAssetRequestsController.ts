
import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import AssetRequestModel from '@models/assetRequests';
import { NoData } from '@libs/errors';
import settings from '@configs/settings';

class PersonalAssetRequestController {
  public async create (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const procedure = req.params.procedure;
      let requestAssetParams;
      if (procedure === AssetRequestModel.PROCEDURE_ENUM.RECALL) {
        requestAssetParams = req.parameters.permit(AssetRequestModel.CREATABLE_RECALL_PARAMETERS).value();
        requestAssetParams.procedure = AssetRequestModel.PROCEDURE_ENUM.RECALL;
      }
      if (procedure === AssetRequestModel.PROCEDURE_ENUM.RENEW) {
        requestAssetParams = req.parameters.permit(AssetRequestModel.CREATABLE_RENEW_PARAMETERS).value();
        requestAssetParams.procedure = AssetRequestModel.PROCEDURE_ENUM.RENEW;
      }
      const userRequest = await AssetRequestModel.create({
        userId: currentUser.id,
        ...requestAssetParams,
      });
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const userRequest = await AssetRequestModel.scope([
        { method: ['byUserId', currentUser.id] },
        { method: ['byStatus', AssetRequestModel.STATUS_ENUM.WAITNGAPPROVAL] },
      ]).findByPk(req.params.assetRequestId);
      if (!userRequest) return sendError(res, 404, NoData);
      await userRequest.destroy();
      sendSuccess(res, { });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const userRequest = await AssetRequestModel.scope([
        { method: ['byUserId', currentUser.id] },
        { method: ['byStatus', AssetRequestModel.STATUS_ENUM.WAITNGAPPROVAL] },
      ]).findByPk(req.params.assetRequestId);
      if (!userRequest) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(AssetRequestModel.UPDATABLE_PARAMETERS).value();
      await userRequest.update(params);
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async cancel (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const userRequest = await AssetRequestModel.scope([
        { method: ['byUserId', currentUser.id] },
        { method: ['byStatus', AssetRequestModel.STATUS_ENUM.WAITNGAPPROVAL] },
      ]).findByPk(req.params.assetRequestId);
      if (!userRequest) return sendError(res, 404, NoData);
      await userRequest.update({
        status: AssetRequestModel.STATUS_ENUM.CANCELLED,
      });
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const { freeWord, status, dateFrom, dateTo } = req.query;
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [
        { method: ['byUserId', currentUser.id] },
        'withAdminName',
        'withCategoryName',
        'withUser',
        'withAssetName',
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); };
      if (status) { scopes.push({ method: ['byStatus', status] }); };
      if (dateFrom && dateTo) { scopes.push({ method: ['byCreatedAt', dateFrom, dateTo] }); };
      const { count, rows } = await AssetRequestModel.scope(scopes).findAndCountAll({
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
      const currentUser = req.currentUser;
      const scopes: any = [
        { method: ['byUserId', currentUser.id] },
        'withAssetName',
        'withAdminName',
        'withHistory',
        'withCategoryName',
      ];
      const userRequest = await AssetRequestModel.scope(scopes).findByPk(req.params.assetRequestId);
      if (!userRequest) { return sendError(res, 404, NoData); }
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new PersonalAssetRequestController();
