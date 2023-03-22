import { BelongsToManySetAssociationsMixin, Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize, Transaction, ValidationErrorItem } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import UserInterface from '@interfaces/users';
import UserEntity from '@entities/users';
import jwt from 'jsonwebtoken';
import settings from '@configs/settings';
import * as bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import PositionModel from './positions';
// import MailerService from '@services/mailer';

class UserModel extends Model<UserInterface> implements UserInterface {
  public id: number;
  public employeeCode: string;
  public departmentId: number;
  public positionId: number;
  public address: string;
  public fullName: string;
  public phoneNumber: string;
  public password: string;
  public email: string;
  public dateIn: Date;
  public dateOut: Date;
  public dateOfBirth: Date;
  public gender: string;
  public status: string;
  public role: string;
  public description: string;
  public avatar: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  static readonly CREATABLE_PARAMETERS = ['employeeCode', 'departmentId', 'positionId', 'password', 'fullName', 'phoneNumber', 'email', 'role', 'status', 'dateIn', 'dateOut'];
  public static readonly UPDATABLE_PARAMETERS = ['fullName', 'employeeCode', 'dateOfBirth', 'departmentId', 'positionId', 'phoneNumber', 'address', 'dateIn', 'dateOut', 'gender', 'status', 'role', 'description', 'password']
  public static readonly USER_UPDATABLE_PARAMETERS = ['fullName', 'employeeCode', 'dateOfBirth', 'departmentId', 'positionId', 'phoneNumber', 'address', 'dateIn', 'dateOut', 'gender', 'description']
  public static readonly TYPE_ENUM ={ ADMIN: 'admin', USER: 'user' };
  static readonly hooks: Partial<ModelHooks<UserModel>> = {
    beforeSave (record) {
      if (record.password && record.password !== record.previous('password')) {
        (record).hashPassword();
      }
    },
    // async afterCreate (record) {
    //   const password = record.previous('password');
    //   await MailerService.sendMailRegister(record, password);
    // },
  }

  static readonly validations: ModelValidateOptions = {
    async uniqueEmail () {
      if (this.email) {
        const existedRecord = await UserModel.scope([{ method: ['byEmail', this.email] }]).findOne();
        if (existedRecord && existedRecord.id !== this.id) {
          throw new ValidationErrorItem('Email đã được sử  dụng', 'uniqueEmail', 'email', this.email);
        }
      }
    },
    async uniqueEmployeeCode () {
      if (this.employeeCode) {
        const existedRecord = await UserModel.scope([{ method: ['byEmployeeCode', this.employeeCode] }]).findOne();
        if (existedRecord && existedRecord.id !== this.id) {
          throw new ValidationErrorItem('Mã nhân viên đã được sử dụng.', 'uniqueEmployeeCode', 'employeeCode', this.employeeCode);
        }
      }
    },
  }

  public setPositions: BelongsToManySetAssociationsMixin<PositionModel, number>;

  public async updatePositions (attributes: any[], transaction?: Transaction) {
    if (!attributes || !attributes.length) return;
    const positions = await PositionModel.scope([{ method: ['byId', attributes.map(attribute => attribute.positionId)] }]).findAll();
    await this.setPositions(positions, { transaction });
  }

  static readonly scopes: ModelScopeOptions = {
    byEmail (email) {
      return {
        where: { email },
      };
    },
    byFreeWord (freeWord) {
      return {
        where: {
          [Op.or]: [
            { fullName: { [Op.like]: `%${freeWord || ''}%` } },
            { email: { [Op.like]: `%${freeWord || ''}%` } },
            { employeeCode: freeWord },
          ],
        },
      };
    },
    bySort (sortBy, sortOrder) {
      return {
        order: [
          [
            sortBy,
            sortOrder,
          ],
        ],
      };
    },
    byRole (role) {
      return {
        where: { role },
      };
    },
    byCreatedAt (fromDate, toDate) {
      if (!fromDate && !toDate) { return { where: {} }; }
      const condition: any = {};
      if (fromDate) Object.assign(condition, { [Op.gte]: dayjs(fromDate).format() });
      if (toDate) Object.assign(condition, { [Op.lte]: dayjs(toDate).format() });
      return {
        where: {
          createdAt: condition,
        },
      };
    },
    byEmployeeCode (employeeCode) {
      return {
        where: { employeeCode },
      };
    },
    withDepartmentName () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT departmentName FROM departments WHERE id = UserModel.departmentId)'),
              'departmentName',
            ],
          ],
        },
      };
    },
    withPositionName () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT title FROM positions WHERE id = UserModel.positionId)'),
              'positionName',
            ],
          ],
        },
      };
    },
    byStatus (status) {
      return {
        where: { status },
      };
    },
    byPosition (positionIds) {
      return {
        include: {
          model: PositionModel,
          attributes: [],
          require: true,
          where: { Id: { [Op.in]: positionIds } },
        },
      };
    },
  }

  private hashPassword () {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  };

  public generateAccessToken () {
    const id = { id: this.id };
    const token = jwt.sign(id, settings.jwt.userSecret, { expiresIn: settings.jwt.expiresIn });
    return token;
  };

  public async validPassword (password: string) {
    const userPassword = this.password;
    const isMatching = await bcrypt.compare(password, userPassword);
    return isMatching;
  };

  public static initialize (sequelize: Sequelize) {
    this.init(UserEntity, {
      hooks: UserModel.hooks,
      scopes: UserModel.scopes,
      validate: UserModel.validations,
      tableName: 'users',
      sequelize,
      paranoid: true,
    });
  }

  public static associate () {
    this.belongsTo(PositionModel, {
      foreignKey: 'positionId',
    });
  }
}

export default UserModel;
