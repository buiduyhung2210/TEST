import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import UserRequestModel from '@models/userRequests';
import { NoData } from '@libs/errors';
import settings from '@configs/settings';
import UserRequestResource from '@models/requestResources';
import sequelize from '@initializers/sequelize';

class PersonalRequestsController {
  public async create (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const params = req.parameters.permit(UserRequestModel.CREATABLE_PARAMETERS).value();
      const userRequest = await UserRequestModel.create({
        userId: currentUser.id,
        ...params,
      }, { include: [{ model: UserRequestResource, as: 'medias' }] });
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const { freeWord, status, fromDate, toDate } = req.query;
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [
        { method: ['byUserId', currentUser.id] },
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); };
      if (status) { scopes.push({ method: ['byStatus', status] }); };
      if (fromDate && toDate) { scopes.push({ method: ['byCreatedAt', fromDate, toDate] }); }
      const { count, rows } = await UserRequestModel.scope(scopes).findAndCountAll({
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
      const userRequest = await UserRequestModel.scope([{ method: ['byUserId', currentUser.id] }, 'withHistory', 'withRequestResources']).findByPk(req.params.userRequestId);
      if (!userRequest) { return sendError(res, 404, NoData); }
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const userRequest = await UserRequestModel.scope([
        { method: ['byUserId', currentUser.id] },
        'byDeletedStatus',
      ]).findByPk(req.params.userRequestId);
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
      const userRequest = await UserRequestModel.scope([
        { method: ['byUserId', currentUser.id] },
        { method: ['byStatus', UserRequestModel.STATUS_ENUM.WAITNGAPPROVAL] },
      ]).findByPk(req.params.userRequestId);
      if (!userRequest) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(UserRequestModel.UPDATABLE_PARAMETERS).value();
      await sequelize.transaction(async (transaction) => {
        await userRequest.update(params, transaction);
        await userRequest.updateMedia(params.medias, transaction);
      });
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async cancel (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const userRequest = await UserRequestModel.scope([
        { method: ['byUserId', currentUser.id] },
        { method: ['byStatus', UserRequestModel.STATUS_ENUM.WAITNGAPPROVAL] },
      ]).findByPk(req.params.userRequestId);
      if (!userRequest) return sendError(res, 404, NoData);
      await userRequest.update({
        status: UserRequestModel.STATUS_ENUM.CANCELLED,
      });
      sendSuccess(res, { userRequest });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new PersonalRequestsController();
