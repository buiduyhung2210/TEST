import { Model, ModelScopeOptions, ModelValidateOptions, Sequelize, ValidationErrorItem, Op, BelongsToGetAssociationMixin } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import AssetInterface from '@interfaces/assets';
import AssetEntity from '@entities/assets';
import CategoryModel from '@models/categories';
import dayjs from 'dayjs';
import AssetResourcesInterface from '@interfaces/assetResources';
import AssetResourcesModel from './assetResources';

class AssetModel extends Model<AssetInterface> implements AssetInterface {
  public id: number;
  public code: string;
  public name: string;
  public categoryId: number;
  public supplierId: number;
  public userId: number;
  public price: number;
  public detail: string;
  public status: string;
  public type: string;
  public boughtDate: Date;
  public warrantyExpriedDate: Date;
  public purchaseInformation: string;
  public note: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  public static readonly CREATABLE_PARAMETERS = ['code', 'type', 'name', 'price', 'categoryId', 'supplierId', 'detail', 'boughtDate', 'warrantyExpriedDate', 'purchaseInformation', 'note', {
    medias: [
      'source', 'type',
    ],
  }]

  public static readonly UPDATABLE_PARAMETERS = ['type', 'price', 'categoryId', 'detail', 'boughtDate', 'warrantyExpriedDate', 'purchaseInformation', 'note', {
    medias: [
      'source', 'type', 'id',
    ],
  }]

  static readonly STATUS_ENUM = { BEINGUSED: 'beingUsed', SPARE: 'spare', BROKEN: 'broken', SOLD: 'sold' };

  static readonly hooks: Partial<ModelHooks<AssetModel>> = {
    async afterDestroy (record) {
      await record.deleteMedias();
    },
  }

  private async deleteMedias () {
    await AssetResourcesModel.destroy({ where: { assetId: this.id }, individualHooks: true });
  };

  public async updateMedia (medias : any[], transaction?:any) {
    medias.forEach((mediaAttribute) => { mediaAttribute.assetId = this.id; });
    const file = await AssetResourcesModel.bulkCreate(medias, { updateOnDuplicate: AssetResourcesModel.UPDATEONDUPLICATE_PARAMETERS as (keyof AssetResourcesInterface)[], transaction });
    const resourcesId = file.map((fileId) => fileId.id);
    await AssetResourcesModel.destroy({ where: { id: { [Op.notIn]: resourcesId }, assetId: this.id }, transaction });
  };

  static readonly validations: ModelValidateOptions = {
    async checkCategoryId () {
      const existedRecord = await CategoryModel.findByPk(this.categoryId);
      if (!existedRecord) {
        throw new ValidationErrorItem('Không tồn tại danh mục', 'checkCategoryId', 'categoryId', this.categoryId);
      }
    },
    async checkPrice () {
      if (this.price < 0) {
        throw new ValidationErrorItem('giá tiền k hợp lế', 'checkPrice', 'price', this.price);
      }
    },
  }

  static readonly scopes: ModelScopeOptions = {
    byFreeWord (freeWord) {
      return {
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${freeWord || ''}%` } },
            { code: { [Op.like]: `%${freeWord || ''}%` } },
          ],
        },
      };
    },
    withCategory () {
      return {
        include: [
          {
            model: CategoryModel,
            as: 'category',
          },
        ],
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
    byStatus (status) {
      return {
        where: { status },
      };
    },
    byType (type) {
      return {
        where: { type },
      };
    },
    byCategory (categoryId) {
      return {
        where: { categoryId },
      };
    },
    bySupplierId (supplierId) {
      return {
        where: { supplierId },
      };
    },
    byBoughtDate (dateFrom, dateTo) {
      return {
        where: {
          boughtDate: {
            [Op.between]: [dayjs(dateFrom).format(), dayjs(dateTo).format()],
          },
        },
      };
    },
    withResources () {
      return {
        include: [
          {
            model: AssetResourcesModel,
            as: 'medias',
          },
        ],
      };
    },
    withUserName () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT fullName FROM users WHERE id = AssetModel.userId)'),
              'fullName',
            ],
          ],
        },
      };
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(AssetEntity, {
      hooks: AssetModel.hooks,
      scopes: AssetModel.scopes,
      validate: AssetModel.validations,
      tableName: 'assets',
      sequelize,
      paranoid: true,
    });
  }

  public getCategory: BelongsToGetAssociationMixin<CategoryModel>

  public static associate () {
    this.belongsTo(CategoryModel, {
      as: 'category',
      foreignKey: 'categoryId',
    });
    this.hasMany(AssetResourcesModel,
      {
        as: 'medias',
        foreignKey: 'assetId',
      });
  }
}

export default AssetModel;
