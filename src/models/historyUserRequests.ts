import { Model, ModelScopeOptions, ModelValidateOptions, Sequelize } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import HistoryUserRequestInterface from '@interfaces/historyUserRequests';
import HistotyUserRequestEntity from '@entities/historyUserRequests';

class HistoryUserRequestModel extends Model<HistoryUserRequestInterface> implements HistoryUserRequestInterface {
  public id: number;
  public requestId: number;
  public status: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly hooks: Partial<ModelHooks<HistoryUserRequestModel>> = {}

  static readonly validations: ModelValidateOptions = {}

  static readonly scopes: ModelScopeOptions = {}

  public static initialize (sequelize: Sequelize) {
    this.init(HistotyUserRequestEntity, {
      hooks: HistoryUserRequestModel.hooks,
      scopes: HistoryUserRequestModel.scopes,
      validate: HistoryUserRequestModel.validations,
      tableName: 'history_user_requests',
      sequelize,
    });
  }

  public static associate () { }
}

export default HistoryUserRequestModel;
