import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import ImageUploaderService from '@services/imageUploader';
import settings from '@configs/settings';
import UserModel from '@models/users';
import { FileNotAccepted, NoData } from '@libs/errors';
import ExcelService from '@services/excel';
import dayjs from 'dayjs';
import UploadExcelService from '@services/excelUpload';

class UserController {
  public async show (req: Request, res: Response) {
    try {
      const scopes: any = [
        'withDepartmentName',
        'withPositionName',
      ];
      const user = await UserModel.scope(scopes).findByPk(req.params.userId);
      if (!user) { return sendError(res, 404, NoData); }
      sendSuccess(res, user);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const { freeWord, status, positionIds } = req.query;
      const sortBy = req.query.sortBy || 'id';
      const sortOrder = req.query.sortOrder || 'DESC';
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [
        ({ method: ['bySort', sortBy, sortOrder] }),
        'withDepartmentName',
        'withPositionName',
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); }
      if (status) { scopes.push({ method: ['byStatus', status] }); }
      if (positionIds) scopes.push({ method: ['byPosition', (positionIds as string).split(',')] });
      const { count, rows } = await UserModel.scope(scopes).findAndCountAll({
        limit,
        offset,
        distinct: true,
        col: 'UserModel.id',
      });
      sendSuccess(res, { rows, pagination: { total: count, page, perPage: limit } });
    } catch (error) {
      sendError(res, 500, error.message, error);
    };
  }

  public async update (req: Request, res: Response) {
    try {
      const user = await UserModel.findByPk(req.params.userId);
      if (!user) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(UserModel.UPDATABLE_PARAMETERS).value();
      await user.update(params);
      sendSuccess(res, user);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async uploadAvatar (req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await UserModel.findByPk(userId);
      if (!user) return sendError(res, 404, NoData);
      const avatar = await ImageUploaderService.singleUpload(req.file);
      await user.update({
        avatar,
      });
      sendSuccess(res, { user });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await UserModel.findByPk(userId);
      if (!user) return sendError(res, 404, NoData);
      await user.destroy();
      sendSuccess(res, { });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async create (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(UserModel.CREATABLE_PARAMETERS).value();
      const user = await UserModel.create(params);
      sendSuccess(res, user);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async updateCurrent (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      if (!currentUser) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(UserModel.USER_UPDATABLE_PARAMETERS).value();
      await currentUser.update(params);
      sendSuccess(res, currentUser);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async download (req: Request, res: Response) {
    try {
      const time = dayjs().format('DD-MM-YY-hh:mm:ss');
      const fileName = `Danh sách nhân viên_${time}.xlsx`;
      const user = await UserModel.findAll();
      const buffer: any = await ExcelService.exportUsersAsExcelFile(user);
      res.writeHead(200, [
        ['Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        ['Content-Disposition', 'attachment; filename=' + `${fileName}`],
      ]);
      res.end(Buffer.from(buffer, 'base64'));
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async upload (req: Request, res: Response) {
    try {
      const extension = req.file.originalname.split('.').pop();
      if (extension !== 'xlsx') {
        return sendError(res, 400, FileNotAccepted);
      } else {
        UploadExcelService.importUsers(req.file, req.currentUser);
        sendSuccess(res, {});
      }
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new UserController();
