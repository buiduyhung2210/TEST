import { BelongsToGetAssociationMixin, Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize, ValidationErrorItem } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import dayjs from 'dayjs';
import settings from '@configs/settings';
import AssetRequestsEntity from '@entities/assetRequests';
import AssetRequestsInterface from '@interfaces/assetRequests';
import UserModel from './users';
import AssetModel from './assets';
import CategoryModel from './categories';
import HistoryUserRequestModel from './historyUserRequests';

class AssetRequestModel extends Model<AssetRequestsInterface> implements AssetRequestsInterface {
  public id: number;
  public userId: number;
  public title: string;
  public describe: string;
  public status: string;
  public assetCategoryId: number;
  public code: string;
  public adminId: number;
  public assetId: number;
  public deadline: Date;
  public adminNote: string;
  public procedure: string;
  public rejectReason: string;
  public dateProcess: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  static readonly CREATABLE_RENEW_PARAMETERS = ['title', 'describe', 'deadline', 'assetCategoryId', 'procedure'];
  static readonly CREATABLE_RECALL_PARAMETERS = ['title', 'describe', 'deadline', 'assetId', 'procedure'];
  static readonly UPDATABLE_PARAMETERS = ['describe', 'assetId', 'adminNote'];
  static readonly ADMIN_DENIED_PARAMETERS = ['rejectReason'];
  static readonly STATUS_ENUM = { WAITNGAPPROVAL: 'waitingApproval', PROCESSING: 'processing', PROCESSED: 'processed', DENIED: 'denied', CANCELLED: 'cancelled' };
  static readonly PROCEDURE_ENUM = { RECALL: 'recall', RENEW: 'renew' };

  static readonly hooks: Partial<ModelHooks<AssetRequestModel>> = {
    beforeCreate (record) {
      record.generateDeadline();
    },
    async afterCreate (record) {
      await record.generateCode();
    },
    beforeSave (record) {
      record.checkNote();
      record.checkAdminId();
    },
  }

  static readonly validations: ModelValidateOptions = {
    async checkStatus () {
      if ([AssetRequestModel.STATUS_ENUM.CANCELLED, AssetRequestModel.STATUS_ENUM.DENIED, AssetRequestModel.STATUS_ENUM.PROCESSED].includes(this._previousDataValues.status)) {
        throw new ValidationErrorItem('Không thể thay đổi trạng thái yêu cầu', 'checkStatus', 'status', this.status);
      }
    },
    async checkCategory () {
      const assetCategoryId = await this.getCategory();
      if (!assetCategoryId) {
        throw new ValidationErrorItem('Loại thiết bị không tồn tại', 'checkCategory', 'assetCategoryId', this.assetCategoryId);
      }
    },
    async checkAsset () {
      const asset = await this.getAsset();
      if (!asset && this.procedure === AssetRequestModel.PROCEDURE_ENUM.RECALL) {
        throw new ValidationErrorItem('Thiết bị không tồn tại', 'checkAsset', 'assetId', this.assetId);
      }
    },
  }

  public getUser: BelongsToGetAssociationMixin<UserModel>
  public getCategory: BelongsToGetAssociationMixin<CategoryModel>
  public getAsset: BelongsToGetAssociationMixin<AssetModel>

  private generateDeadline () {
    if (!this.deadline) {
      this.deadline = dayjs().add(settings.defaultReqestDeadline, 'day').toDate();
    };
  };

  public async updateAsset () {
    const asset = await this.getAsset();
    if (this.procedure === AssetRequestModel.PROCEDURE_ENUM.RENEW) {
      await asset.update({ status: AssetModel.STATUS_ENUM.BEINGUSED });
    }
    await asset.update({ status: AssetModel.STATUS_ENUM.SPARE });
  };

  private async generateCode () {
    if (!this.code) {
      const user = await this.getUser();
      const code = user.employeeCode + ('00000000' + this.id as string).slice(-8);
      await this.update({ code });
    }
  }

  private async checkNote () {
    if (this.status === AssetRequestModel.STATUS_ENUM.PROCESSED) {
      this.rejectReason = null;
    }
    if (this.status === AssetRequestModel.STATUS_ENUM.DENIED) {
      this.adminNote = null;
    }
    if (this.status === AssetRequestModel.STATUS_ENUM.PROCESSING) {
      this.rejectReason = null;
      this.adminNote = null;
    }
  }

  private async checkAdminId () {
    if (this.previous('adminId')) {
      this.adminId = this.previous('adminId');
    }
  }

  static readonly scopes: ModelScopeOptions = {
    byCreatedAt (dateFrom, dateTo) {
      return {
        where: {
          createdAt: {
            [Op.between]: [dateFrom, dateTo],
          },
        },
      };
    },
    byUserId (userId) {
      return {
        where: { userId },
      };
    },
    byStatus (status) {
      return {
        where: { status },
      };
    },
    byFreeWord (freeWord) {
      return {
        where: {
          [Op.or]: [
            { id: freeWord },
            { title: { [Op.like]: `%${freeWord || ''}%` } },
            {
              userId: {
                [Op.in]:
            Sequelize.literal(`(SELECT id FROM users WHERE fullName like "%${freeWord}%" )`),
              },
            },
            {
              assetCategoryId: {
                [Op.in]:
            Sequelize.literal(`(SELECT id FROM categories WHERE name like "%${freeWord}%" )`),
              },
            },
          ],
        },
      };
    },
    withUser () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT fullName FROM users WHERE id = AssetRequestModel.userId)'),
              'fullName',
            ],
          ],
        },
      };
    },
    withAdminName () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT fullName FROM users WHERE id = AssetRequestModel.adminId)'), 'adminName',
            ],
          ],
        },
      };
    },
    withAssetName () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT name FROM assets WHERE id = AssetRequestModel.assetId)'), 'assetName',
            ],
          ],
        },
      };
    },
    withCategoryName () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT name FROM categories WHERE id = AssetRequestModel.assetCategoryId)'), 'categoryName',
            ],
          ],
        },
      };
    },
    withHistory () {
      return {
        include: [
          {
            model: HistoryUserRequestModel,
            as: 'histories',
          },
        ],
      };
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(AssetRequestsEntity, {
      hooks: AssetRequestModel.hooks,
      scopes: AssetRequestModel.scopes,
      validate: AssetRequestModel.validations,
      tableName: 'asset_requests',
      sequelize,
      paranoid: true,
    });
  }

  public static associate () {
    this.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' });
    this.belongsTo(AssetModel, { as: 'asset', foreignKey: 'assetId' });
    this.belongsTo(CategoryModel, { as: 'category', foreignKey: 'assetCategoryId' });
    this.hasMany(HistoryUserRequestModel, { as: 'histories', foreignKey: 'requestId' });
  }
}

export default AssetRequestModel;
