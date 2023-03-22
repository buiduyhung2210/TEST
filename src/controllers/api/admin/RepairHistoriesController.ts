import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import RepairsHistoryModel from '@models/repairHistories';

class RepairsHistoryController {
  public async create (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(RepairsHistoryModel.CREATABLE_PARAMETERS).value();
      const repairHistory = await RepairsHistoryModel.create(params);
      sendSuccess(res, { repairHistory });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const { assetId } = req.query;
      const repairHistories = await RepairsHistoryModel.scope({ method: ['byAssetId', assetId] }).findAll();
      sendSuccess(res, repairHistories);
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }
}
export default new RepairsHistoryController();
