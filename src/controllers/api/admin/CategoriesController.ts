import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import CategoryModel from '@models/categories';
import { NoData, AssetbeingUsed } from '@libs/errors';

class CategoryController {
  public async create (req: Request, res: Response) {
    try {
      const { type } = req.params;
      const params = req.parameters.permit(CategoryModel.CREATABLE_PARAMETERS).value();
      params.type = type;
      const category = await CategoryModel.create(params);
      sendSuccess(res, { category });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const { type } = req.params;
      const freeWord = req.query.freeWord;
      const sortBy = req.query.sortBy || 'name';
      const sortOrder = req.query.sortOrder || 'DESC';
      const scopes: any = [
        { method: ['bySort', sortBy, sortOrder] },
        { method: ['byType', type] },
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); }
      const categories = await CategoryModel.scope(scopes).findAll();
      sendSuccess(res, { categories });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const { type, categoryId } = req.params;
      const category = await CategoryModel.scope({ method: ['byType', type] }).findByPk(categoryId);
      if (!category) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(CategoryModel.UPDATABLE_PARAMETERS).value();
      await category.update(params);
      sendSuccess(res, { category });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const { type, categoryId } = req.params;
      const category = await CategoryModel.scope({ method: ['byType', type] }).findByPk(categoryId);
      if (!category) return sendError(res, 404, NoData);
      if (!await category.deleteAssets()) { return sendError(res, 325, AssetbeingUsed); }
      await category.destroy();
      sendSuccess(res, { });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new CategoryController();
