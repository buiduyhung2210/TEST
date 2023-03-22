import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import DepartmentModel from '@models/departments';
import { NoData } from '@libs/errors';
import settings from '@configs/settings';

class DepartmentController {
  public async create (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(DepartmentModel.CREATABLE_PARAMETERS).value();
      const department = await DepartmentModel.create(params);
      sendSuccess(res, department);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const { count, rows } = await DepartmentModel.scope(['withManager', 'withEmployeeNumber']).findAndCountAll({
        limit,
        offset,
        distinct: true,
        col: 'DepartmentModel.id',
      });
      sendSuccess(res, { rows, pagination: { total: count, page, perPage: limit } });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const deparment = await DepartmentModel.findByPk(req.params.departmentId);
      if (!deparment) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(DepartmentModel.UPDATABLE_PARAMETERS).value();
      await deparment.update(params);
      sendSuccess(res, deparment);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const { departmentId } = req.params;
      const deparment = await DepartmentModel.findByPk(departmentId);
      if (!deparment) return sendError(res, 404, NoData);
      await deparment.destroy();
      sendSuccess(res, { });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new DepartmentController();
