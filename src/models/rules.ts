import { Model, ModelScopeOptions, ModelValidateOptions, Sequelize, Op } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import RuleInterface from '@interfaces/rules';
import RuleEntity from '@entities/rules';
import dayjs from 'dayjs';

class RuleModel extends Model<RuleInterface> implements RuleInterface {
  public id: number;
  public title: string;
  public content: string;
  public status: string;
  public createdAt: Date;
  public updatedAt: Date;

  public static readonly CREATABLE_PARAMETERS = ['title', 'content', 'status']
  public static readonly UPDATABLE_PARAMETERS = ['title', 'content', 'status']

  static readonly hooks: Partial<ModelHooks<RuleModel>> = {
  }

  static readonly validations: ModelValidateOptions = {
  }

  static readonly scopes: ModelScopeOptions = {
    byFreeWord (freeWord) {
      return {
        where: {
          [Op.or]: [
            { title: { [Op.substring]: freeWord } },
          ],
        },
      };
    },
    byCreatedTime (from, to) {
      const fromDate = from ? dayjs(from).format() : dayjs('0').format();
      const toDate = to ? dayjs(to).format() : dayjs('9999').format();
      return {
        where: {
          createdAt: {
            [Op.between]: [fromDate, toDate],
          },
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
  }

  public static initialize (sequelize: Sequelize) {
    this.init(RuleEntity, {
      hooks: RuleModel.hooks,
      scopes: RuleModel.scopes,
      validate: RuleModel.validations,
      tableName: 'rules',
      sequelize,
    });
  }

  public static associate () { }
}

export default RuleModel;
