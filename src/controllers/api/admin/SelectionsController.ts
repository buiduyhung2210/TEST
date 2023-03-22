import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import SupplierModel from '@models/supplier';
import DepartmentModel from '@models/departments';
import UserModel from '@models/users';
import PositionModel from '@models/positions';

class SelectionsController {
  public async indexSupplier (req: Request, res: Response) {
    try {
      const { freeWord } = req.query;
      const scopes: any = [
        { method: ['bySort', 'createdAt', 'DESC'] },
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); };
      const suppliers = await SupplierModel.scope(scopes).findAndCountAll();
      sendSuccess(res, { suppliers });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async indexDepartment (req: Request, res: Response) {
    try {
      const { freeWord } = req.query;
      const scopes: any = [
        { method: ['bySort', 'createdAt', 'DESC'] },
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); };
      const departments = await DepartmentModel.scope(scopes).findAndCountAll();
      sendSuccess(res, { departments });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async indexUser (req: Request, res: Response) {
    try {
      const { freeWord, role } = req.query;
      const scopes: any = [
        { method: ['bySort', 'createdAt', 'DESC'] },
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); };
      if (role) { scopes.push({ method: ['byRole', role] }); };
      const users = await UserModel.scope(scopes).findAndCountAll();
      sendSuccess(res, { users });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async indexPosition (req: Request, res: Response) {
    try {
      const { freeWord } = req.query;
      const scopes: any = [
        { method: ['bySort', 'createdAt', 'DESC'] },
      ];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); };
      const positions = await PositionModel.scope(scopes).findAndCountAll();
      sendSuccess(res, { positions });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new SelectionsController();
