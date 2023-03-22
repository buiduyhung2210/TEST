import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import RuleModel from '@models/rules';
import { NoData } from '@libs/errors';

class RuleController {
  public async create (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(RuleModel.CREATABLE_PARAMETERS).value();
      const rule = await RuleModel.create(params);
      sendSuccess(res, rule);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const rule = await RuleModel.findByPk(req.params.ruleId);
      if (!rule) {
        return sendError(res, 404, NoData);
      }
      await rule.destroy();
      sendSuccess(res, { });
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const rule = await RuleModel.findByPk(req.params.ruleId);
      if (!rule) {
        return sendError(res, 404, NoData);
      }
      const params = req.parameters.permit(RuleModel.UPDATABLE_PARAMETERS).value();
      await rule.update(params);
      sendSuccess(res, rule);
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }

  public async show (req: Request, res: Response) {
    try {
      const rule = await RuleModel.findByPk(req.params.ruleId);
      if (!rule) { return sendError(res, 404, NoData); }
      sendSuccess(res, { rule });
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const { freeWord, fromDate, toDate } = req.query;
      const sortBy = req.query.sortBy || 'id';
      const sortOrder = req.query.sortOrder || 'DESC';
      const scopes: any = [
        ({ method: ['bySort', sortBy, sortOrder] }),
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); }
      if (fromDate || toDate) { scopes.push({ method: ['byCreatedTime', fromDate, toDate] }); }
      const rules = await RuleModel.scope(scopes).findAll();
      sendSuccess(res, { rules });
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }
}

export default new RuleController();
