import { Model, ModelScopeOptions, ModelValidateOptions, Sequelize } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import RequestResourceInterface from '@interfaces/requestResources';
import RequestResourceEntity from '@entities/requestResources';

class RequestResourceModel extends Model<RequestResourceInterface> implements RequestResourceInterface {
  public id: number;
  public source: string;
  public requestAbleType: string;
  public requestAbleId: number;
  public type: string;
  public createdAt: Date;
  public updatedAt: Date;

  public static readonly UPDATE_ON_DUPLICATE_PARAMETERS = ['id', 'source', 'type'];
  public static readonly RESOURCE_TYPE_ENUM = { USER_REQUEST: 'userRequest', ASSET_REQUEST: 'assetRequest' };

  static readonly hooks: Partial<ModelHooks<RequestResourceModel>> = {}

  static readonly validations: ModelValidateOptions = {}

  static readonly scopes: ModelScopeOptions = {}

  public static initialize (sequelize: Sequelize) {
    this.init(RequestResourceEntity, {
      hooks: RequestResourceModel.hooks,
      scopes: RequestResourceModel.scopes,
      validate: RequestResourceModel.validations,
      tableName: 'request_resources',
      sequelize,
    });
  }

  public static associate () {}
}

export default RequestResourceModel;
