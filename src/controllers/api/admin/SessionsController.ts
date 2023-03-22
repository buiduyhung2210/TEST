import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import User from '@models/users';
import { BadAuthentication, NoData } from '@libs/errors';

class SessionsController {
  public async login (req: Request, res: Response, next: any) {
    try {
      const param = { email: req.body.email, password: req.body.password };
      const user = await User.scope([
        { method: ['byEmail', param.email] },
      ]).findOne();
      if (!user || !(await user.validPassword(param.password))) return sendError(res, 404, BadAuthentication);
      user.password = undefined;
      const token = user.generateAccessToken();
      sendSuccess(res, { jwt: token });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async show (req: Request, res: Response, next: any) {
    try {
      const currentUser = req.currentUser;
      if (!currentUser) { return sendError(res, 404, NoData); }
      sendSuccess(res, currentUser);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}
export default new SessionsController();
