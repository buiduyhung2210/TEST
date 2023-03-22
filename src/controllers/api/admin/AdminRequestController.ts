import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import UserRequestModel from '@models/userRequests';
import { NoData } from '@libs/errors';
import settings from '@configs/settings';

class AdminRequestController {
  public async index (req: Request, res: Response) {
    try {
      const { freeWord, status, dateFrom, dateTo } = req.query;
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [
        'withUser',
        'withAdminName',
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); };
      if (status) { scopes.push({ method: ['byStatus', status] }); };
      if (dateFrom && dateTo) { scopes.push({ method: ['byCreatedAt', dateFrom, dateTo] }); };
      const { count, rows } = await UserRequestModel.scope(scopes).findAndCountAll({
        limit,
        offset,
        distinct: true,
        col: 'UserRequestModel.id',
      });
      sendSuccess(res, { rows, pagination: { total: count, page, perPage: limit } });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async show (req: Request, res: Response) {
    try {
      const scopes: any = [
        'withHistory',
        'withRequestResources',
      ];
      const userRequest = await UserRequestModel.scope(scopes).findByPk(req.params.userRequestId);
      if (!userRequest) { return sendError(res, 404, NoData); }
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const userRequest = await UserRequestModel.findByPk(req.params.userRequestId);
      const admin = req.currentUser;
      const params = req.parameters.permit(UserRequestModel.ADMIN_CONFIRM_PARAMETERS).value();
      await userRequest.update({
        adminId: admin.id,
        ...params,
      });
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new AdminRequestController();
