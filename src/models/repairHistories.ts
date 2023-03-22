import { Model, ModelScopeOptions, ModelValidateOptions, Sequelize, ValidationErrorItem } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import repairHistoriesInterface from '@interfaces/repairHistories';
import repairHistoriesEntity from '@entities/repairHistories';

class repairHistoriesModel extends Model<repairHistoriesInterface> implements repairHistoriesInterface {
  public id : number;
  public assetId : number;
  public repairDate: Date;
  public problemDetails: string;
  public cost: number;
  public createdAt : Date;
  public updatedAt : Date;

  public static readonly CREATABLE_PARAMETERS = ['assetId', 'repairDate', 'problemDetails', 'cost'];

  static readonly hooks: Partial<ModelHooks<repairHistoriesModel>> = {};

  static readonly validations: ModelValidateOptions = {
    async costValid () {
      if (this.cost < 0) {
        throw new ValidationErrorItem('chi phí không hợp lế', 'costValid', 'cost', this.cost);
      }
    },
  };

  static readonly scopes: ModelScopeOptions = {
    byAssetId (assetId) {
      return {
        where: { assetId },
      };
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(repairHistoriesEntity, {
      hooks: repairHistoriesModel.hooks,
      scopes: repairHistoriesModel.scopes,
      validate: repairHistoriesModel.validations,
      tableName: 'repair_histories',
      sequelize,
    });
  }

  public static associate () { }
}

export default repairHistoriesModel;
