import settings from '@configs/settings';
import { sendError, sendSuccess } from '@libs/response';
import AssetModel from '@models/assets';
import { Request, Response } from 'express';

class PurchasesHistoryController {
  public async index (req: Request, res: Response) {
    try {
      const { freeWord, dateFrom, dateTo, supplierId } = req.query;
      const sortBy = req.query.sortBy || 'id';
      const sortOrder = req.query.sortOrder || 'DESC';
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [
        { method: ['bySort', sortBy, sortOrder] },
      ];
      if (supplierId) {
        scopes.push({ method: ['bySupplierId', supplierId] },
        );
      }
      if (dateFrom && dateTo) { scopes.push({ method: ['byBoughtDate', dateFrom, dateTo] }); };
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); }
      const { count, rows } = await AssetModel.scope(scopes).findAndCountAll({
        limit,
        offset,
      });
      sendSuccess(res, { rows, pagination: { total: count, page, perPage: limit } });
    } catch (error) {
      sendError(res, 500, error.message, error);
    };
  }
}

export default new PurchasesHistoryController();
