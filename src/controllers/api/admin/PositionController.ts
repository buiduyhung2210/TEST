import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import PositionModel from '@models/positions';
import { NoData } from '@libs/errors';
import settings from '@configs/settings';

class PositionController {
  public async create (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(PositionModel.CREATABLE_PARAMETERS).value();
      const position = await PositionModel.create(params);
      sendSuccess(res, position);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async show (req: Request, res: Response) {
    try {
      const position = await PositionModel.findByPk(req.params.positionId);
      if (!position) { return sendError(res, 404, NoData); };
      sendSuccess(res, { position });
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const { freeWord } = req.query;
      const sortBy = req.query.sortBy || 'id';
      const sortOrder = req.query.sortOrder || 'DESC';
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [
        { method: ['bySort', sortBy, sortOrder] },
        'withTotalUsers',
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); }
      const { count, rows } = await PositionModel.scope(scopes).findAndCountAll({
        limit,
        offset,
        distinct: true,
        col: 'PositionModel.id',
      });
      sendSuccess(res, { rows, pagination: { total: count, page, perPage: limit } });
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const position = await PositionModel.findByPk(req.params.positionId);
      if (!position) {
        return sendError(res, 404, NoData);
      }
      const params = req.parameters.permit(PositionModel.UPDATABLE_PARAMETERS).value();
      await position.update(params);
      sendSuccess(res, { position });
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const position = await PositionModel.findByPk(req.params.positionId);
      if (!position) {
        return sendError(res, 404, NoData);
      }
      await position.destroy();
      sendSuccess(res, { });
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }
}
export default new PositionController();
