import { Model, ModelScopeOptions, ModelValidateOptions, Sequelize } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import AssetResourcesInterface from '@interfaces/assetResources';
import AssetResourcesEntity from '@entities/assetResources';

class FileModel extends Model<AssetResourcesInterface> implements AssetResourcesInterface {
  public id: number;
  public source: string;
  public assetId: number;
  public type: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  public static readonly CREATABLE_PARAMETERS = ['source', 'type']
  public static readonly UPDATEONDUPLICATE_PARAMETERS = ['id', 'source', 'type']

  static readonly hooks: Partial<ModelHooks<FileModel>> = { }

  static readonly validations: ModelValidateOptions = {}

  static readonly scopes: ModelScopeOptions = {}

  public static initialize (sequelize: Sequelize) {
    this.init(AssetResourcesEntity, {
      hooks: FileModel.hooks,
      scopes: FileModel.scopes,
      validate: FileModel.validations,
      tableName: 'asset_resources',
      sequelize,
    });
  }

  public static associate () {
  }
}

export default FileModel;
