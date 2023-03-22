import { BelongsToGetAssociationMixin, Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize, ValidationErrorItem } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import UserRequestInterface from '@interfaces/userRequests';
import UserRequestResourceInterface from '@interfaces/requestResources';
import UserRequestEntity from '@entities/userRequests';
import UserModel from './users';
import HistoryUserRequestModel from './historyUserRequests';
import RequestResourceModel from './requestResources';

class UserRequestModel extends Model<UserRequestInterface> implements UserRequestInterface {
  public id: number;
  public userId: number;
  public title: string;
  public describe: string;
  public status: string;
  public adminNote: string;
  public rejectReason: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public code: string;
  public adminId: number;

  static readonly CREATABLE_PARAMETERS = ['title', 'describe', {
    medias: [
      'source', 'type',
    ],
  }];

  static readonly UPDATABLE_PARAMETERS = ['describe', {
    medias: [
      'source', 'type', 'id',
    ],
  }];

  static readonly ADMIN_CONFIRM_PARAMETERS = ['status', 'adminNote', 'rejectReason'];
  static readonly STATUS_ENUM = { WAITNGAPPROVAL: 'waitingApproval', PROCESSING: 'processing', PROCESSED: 'processed', DENIED: 'denied', CANCELLED: 'cancelled' };
  static readonly STATUS_MESSAGE = { WAITNGAPPROVAL: 'Tạo yêu cầu, đợi phê duyệt', PROCESSING: 'Đã phê duyệt, đang xử lý', PROCESSED: 'Đã xử lý', DENIED: 'Bị từ chối', CANCELLED: 'Đã hủy' };

  static readonly hooks: Partial<ModelHooks<UserRequestModel>> = {
    async afterCreate (record) {
      await record.generateCode();
    },
    beforeSave (record) {
      record.checkNote();
      record.checkAdminId();
    },
    async afterSave (record) {
      const attributes:any = {};
      if (record.isNewRecord || (record.status && record.status !== record.previous('status'))) {
        attributes.requestId = record.id;
        switch (record.status) {
          case 'waitingApproval': attributes.status = UserRequestModel.STATUS_MESSAGE.WAITNGAPPROVAL; break;
          case 'processing': attributes.status = UserRequestModel.STATUS_MESSAGE.PROCESSING; break;
          case 'processed': attributes.status = UserRequestModel.STATUS_MESSAGE.PROCESSED; break;
          case 'denied': attributes.status = UserRequestModel.STATUS_MESSAGE.DENIED; break;
          case 'cancel': attributes.status = UserRequestModel.STATUS_MESSAGE.CANCELLED; break;
        }
        await HistoryUserRequestModel.create(attributes);
      };
    },
    async afterDestroy (record) {
      await record.deleteResourcesAndHistories();
    },
  }

  public async updateMedia (medias: any[], transaction?: any) {
    medias.forEach((mediaAttribute) => {
      mediaAttribute.requestAbleId = this.id;
      mediaAttribute.requestAbleType = RequestResourceModel.RESOURCE_TYPE_ENUM.USER_REQUEST;
    });
    const resources = await RequestResourceModel.bulkCreate(medias, { updateOnDuplicate: RequestResourceModel.UPDATE_ON_DUPLICATE_PARAMETERS as (keyof UserRequestResourceInterface)[], transaction });
    const userRequestResources = resources.map(resource => resource.id);
    await RequestResourceModel.destroy({
      where: {
        id: { [Op.notIn]: userRequestResources },
        [Op.and]: [{ requestAbleId: this.id }, { requestAbleType: RequestResourceModel.RESOURCE_TYPE_ENUM.USER_REQUEST }],
      },
      transaction,
    });
  };

  private async deleteResourcesAndHistories () {
    await RequestResourceModel.destroy({ where: { requestAbleId: this.id }, individualHooks: true });
    await HistoryUserRequestModel.destroy({ where: { requestId: this.id }, individualHooks: true });
  };

  static readonly validations: ModelValidateOptions = {
    async checkStatus () {
      if ([UserRequestModel.STATUS_ENUM.CANCELLED, UserRequestModel.STATUS_ENUM.DENIED, UserRequestModel.STATUS_ENUM.PROCESSED].includes(this._previousDataValues.status)) {
        throw new ValidationErrorItem('Không thể thay đổi trạng thái yêu cầu', 'checkStatus', 'status', this.status);
      }
      if (this._previousDataValues.status === UserRequestModel.STATUS_ENUM.WAITNGAPPROVAL && this.status === UserRequestModel.STATUS_ENUM.PROCESSED) {
        throw new ValidationErrorItem('Thay đổi trạng thái không đúng quy trình', 'checkStatus', 'status', this.status);
      }
    },
  }

  public getUser: BelongsToGetAssociationMixin<UserModel>

  private async generateCode () {
    if (!this.code) {
      const user = await this.getUser();
      const code = user.employeeCode + ('00000000' + this.id as string).slice(-8);
      await this.update({ code }, { hooks: false });
    }
  }

  private async checkNote () {
    if (this.status === UserRequestModel.STATUS_ENUM.PROCESSED) {
      this.rejectReason = null;
    }

    if (this.status === UserRequestModel.STATUS_ENUM.DENIED) {
      this.adminNote = null;
    }

    if (this.status === UserRequestModel.STATUS_ENUM.PROCESSING) {
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
    byDeletedStatus () {
      return {
        where: {
          [Op.or]: [
            { status: UserRequestModel.STATUS_ENUM.CANCELLED },
            { status: UserRequestModel.STATUS_ENUM.DENIED },
          ],
        },
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
          ],
        },
      };
    },
    withUser () {
      return {
        attributes: {
          include: [
            [
              Sequelize.literal('(SELECT fullName FROM users WHERE id = UserRequestModel.userId)'),
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
              Sequelize.literal('(SELECT fullName FROM users WHERE id = UserRequestModel.adminId)'), 'adminName',
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
            as: 'history',
          },
        ],
      };
    },
    withRequestResources () {
      return {
        include: [
          {
            model: RequestResourceModel,
            as: 'requestResources',
          },
        ],
      };
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(UserRequestEntity, {
      hooks: UserRequestModel.hooks,
      scopes: UserRequestModel.scopes,
      validate: UserRequestModel.validations,
      tableName: 'user_requests',
      sequelize,
      paranoid: true,
    });
  }

  public static associate () {
    this.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' });
    this.hasMany(HistoryUserRequestModel, { as: 'history', foreignKey: 'requestId' });
    this.hasMany(RequestResourceModel, {
      as: 'requestResources',
      foreignKey: 'requestAbleId',
      scope: {
        requestAbleType: RequestResourceModel.RESOURCE_TYPE_ENUM.USER_REQUEST,
      },
    });
  }
}

export default UserRequestModel;
