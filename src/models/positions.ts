import { Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import PositionInterface from '@interfaces/positions';
import PositionEntity from '@entities/positions';
import dayjs from 'dayjs';

class PositionModel extends Model<PositionInterface> implements PositionInterface {
  public id: number;
  public title: string;
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  public static readonly CREATABLE_PARAMETERS = ['title', 'description']
  public static readonly UPDATABLE_PARAMETERS = ['title', 'description']

  static readonly hooks: Partial<ModelHooks<PositionModel>> = {}

  static readonly validations: ModelValidateOptions = {}

  static readonly scopes: ModelScopeOptions = {
    byFreeWord (freeWord) {
      return {
        where: {
          title: { [Op.substring]: freeWord },
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
    withTotalUsers () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT COUNT(*) FROM users WHERE positionId = PositionModel.id)'),
              'totalUsers',
            ],
          ],
        },
      };
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(PositionEntity, {
      hooks: PositionModel.hooks,
      scopes: PositionModel.scopes,
      validate: PositionModel.validations,
      tableName: 'positions',
      sequelize,
      paranoid: true,
    });
  }

  public static associate () { }
}

export default PositionModel;
