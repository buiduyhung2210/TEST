import { Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import DepartmentInterface from '@interfaces/department';
import DepartmentEntity from '@entities/department';
import SlugGeneration from '@libs/slugGeneration';
import dayjs from 'dayjs';
import UserModel from './users';

class DepartmentModel extends Model<DepartmentInterface> implements DepartmentInterface {
  public id: number;
  public departmentName: string;
  public departmentCode: string;
  public managerId: number;
  public address: string;
  public assetNumber: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  public static readonly CREATABLE_PARAMETERS = ['departmentName', 'address', 'managerId']
  public static readonly UPDATABLE_PARAMETERS = ['departmentName', 'address', 'managerId']

  static readonly hooks: Partial<ModelHooks<DepartmentModel>> = {
    beforeSave (record) {
      record.departmentCode = record.generateDepartmentCode();
    },
    async afterDestroy (record) {
      await record.updateDepartmentId();
    },
  }

  private generateDepartmentCode () {
    const departmentName = SlugGeneration.execute(this.departmentName);
    const abbreviation = departmentName.match(/\b([A-Z])/gi).join('').toUpperCase();
    return abbreviation;
  };

  private async updateDepartmentId () {
    await UserModel.update({ departmentId: null }, { where: { departmentId: this.id }, individualHooks: true });
  };

  static readonly validations: ModelValidateOptions = {
  }

  static readonly scopes: ModelScopeOptions = {
    byDepartmentCode (departmentCode) {
      return {
        where: { departmentCode },
      };
    },
    byFreeWord (freeWord) {
      return {
        where: {
          [Op.or]: [
            { departmentName: { [Op.like]: `%${freeWord || ''}%` } },
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
    withManager () {
      return {
        include: [
          {
            model: UserModel,
            as: 'manager',
            attributes: { exclude: ['password', 'address'] },
          },
        ],
      };
    },
    withEmployeeNumber () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT COUNT(*) FROM users WHERE departmentId = DepartmentModel.id)'),
              'employeeNumber',
            ],
          ],
        },
      };
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(DepartmentEntity, {
      hooks: DepartmentModel.hooks,
      scopes: DepartmentModel.scopes,
      validate: DepartmentModel.validations,
      tableName: 'departments',
      sequelize,
      paranoid: true,
    });
  }

  public static associate () {
    this.belongsTo(UserModel, {
      as: 'manager',
      foreignKey: 'managerId',
      scope: {
        role: 'admin',
      },
    });
  }
}

export default DepartmentModel;
