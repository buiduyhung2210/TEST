import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import SupplierModel from '@models/supplier';
import settings from '@configs/settings';
import { NoData } from '@libs/errors';

class SupplierController {
  public async create (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(SupplierModel.CREATABLE_PARAMETERS).value();
      const supplier = await SupplierModel.create(params);
      sendSuccess(res, { supplier });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const { freeWord } = req.query;
      const sortBy = req.query.sortBy || 'createdAt';
      const sortOrder = req.query.sortOrder || 'DESC';
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [
        { method: ['bySort', sortBy, sortOrder] },
        'withTotalAssets',
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); };
      const { count, rows } = await SupplierModel.scope(scopes).findAndCountAll({
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
      const supplier = await SupplierModel.findByPk(req.params.supplierId);
      if (!supplier) { return sendError(res, 404, NoData); }
      sendSuccess(res, { supplier });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const supplier = await SupplierModel.findByPk(req.params.supplierId);
      if (!supplier) return sendError(res, 404, NoData);
      await supplier.destroy();
      sendSuccess(res, { });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const supplier = await SupplierModel.findByPk(req.params.supplierId);
      if (!supplier) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(SupplierModel.UPDATABLE_PARAMETERS).value();
      await supplier.update(params);
      sendSuccess(res, { supplier });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new SupplierController();
