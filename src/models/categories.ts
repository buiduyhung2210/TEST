import { Model, ModelScopeOptions, ModelValidateOptions, Sequelize, Op } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import CategoryInterface from '@interfaces/categories';
import CategoryEntity from '@entities/categories';
import SlugGeneration from '@libs/slugGeneration';
import AssetModel from './assets';
class CategoryModel extends Model<CategoryInterface> implements CategoryInterface {
  public id: number;
  public name: string;
  public type: string;
  public slug: string;
  public createdAt: Date;
  public updatedAt: Date;
  public prefix: string;

  public static readonly CREATABLE_PARAMETERS = ['name', 'prefix']
  public static readonly UPDATABLE_PARAMETERS = ['name', 'prefix']

  static readonly STATUS_ENUM = { ALL: 'all', DEPARTMENT: 'department', EMPLOYEE: 'employee' };

  static readonly hooks: Partial<ModelHooks<CategoryModel>> = {
    beforeSave (record) {
      record.slug = SlugGeneration.execute(record.name);
      record.prefix = record.prefix.toUpperCase();
    },
    afterUpdate (record) {
      if (record.prefix !== record.previous('prefix')) {
        record.updateAsset();
      };
    },
  }

  private async updateAsset () {
    const Assets = await AssetModel.findAll({ where: { categoryId: this.id } });
    for (const asset of Assets) {
      asset.update({ code: this.prefix + asset.code.substring(asset.code.length - 4) });
    }
  };

  public async deleteAssets () {
    const beingUsedAsset = await AssetModel.scope([{ method: ['byStatus', AssetModel.STATUS_ENUM.BEINGUSED] }, { method: ['byCategory', this.id] }]).findOne();
    if (beingUsedAsset) { return false; }
    return true;
  };

  static readonly validations: ModelValidateOptions = { }

  static readonly scopes: ModelScopeOptions = {
    byFreeWord (freeWord) {
      return {
        where: {
          name: { [Op.like]: `%${freeWord || ''}%` },
        },
      };
    },
    byType (type) {
      return {
        where: {
          type: type,
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
    this.init(CategoryEntity, {
      hooks: CategoryModel.hooks,
      scopes: CategoryModel.scopes,
      validate: CategoryModel.validations,
      tableName: 'categories',
      sequelize,
    });
  }

  public static associate () {
    this.hasMany(AssetModel,
      {
        as: 'assets',
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
        hooks: true,
      });
  }
}

export default CategoryModel;
