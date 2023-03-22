import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import NotificationModel from '@models/notifications';

class NotificationsController {
  public async create (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(NotificationModel.CREATABLE_PARAMETERS).value();
      const notification = await NotificationModel.create({
        createId: req.currentUser.id,
        ...params,
      });
      sendSuccess(res, { notification });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new NotificationsController();
