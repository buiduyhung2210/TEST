import { Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import NotificationInterface from '@interfaces/notifications';
import NotificationEntity from '@entities/notifications';
import UserNotificationModel from './userNotifications';
import UserModel from './users';

class NotificationModel extends Model<NotificationInterface> implements NotificationInterface {
  public id: number;
  public title: string;
  public content: string;
  public sendableId: number[];
  public sendableType: string;
  public createId: number;
  public sendAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  public static readonly CREATABLE_PARAMETERS = ['title', 'content', 'sendableType', 'sendableId']
  public static readonly UPDATABLE_PARAMETERS = ['title', 'content', 'sendableType', 'sendableId']
  static readonly SENDABLE_TYPE_ENUM = { ALL: 'all', DEPARTMENT: 'department', EMPLOYEE: 'employee' };

  static readonly hooks: Partial<ModelHooks<NotificationModel>> = {
    async afterSave (record) {
      record.createNofication();
    },
  }

  private async createNofication () {
    const attributes:any = {
      title: this.title,
      content: this.content,
      notificationId: this.id,
    };
    let userIds: any = [];
    let users:any = [];
    if (this.sendableType === NotificationModel.SENDABLE_TYPE_ENUM.ALL) {
      users = await UserModel.findAll({ raw: true });
      userIds = users.map((users:any) => users.id);
    } else if (this.sendableType === NotificationModel.SENDABLE_TYPE_ENUM.DEPARTMENT) {
      users = await UserModel.findAll({
        where: {
          departmentId: this.sendableId,
        },
        raw: true,
      });
      userIds = users.map((users:any) => users.id);
    } else if (this.sendableType === NotificationModel.SENDABLE_TYPE_ENUM.EMPLOYEE) {
      userIds = this.sendableId;
    }
    const UserNotificationAttributes:any[] = [];
    for (const user of userIds) {
      UserNotificationAttributes.push({ ...attributes, userId: user });
    }
    await UserNotificationModel.bulkCreate(UserNotificationAttributes);
  };

  static readonly validations: ModelValidateOptions = {}

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
    this.init(NotificationEntity, {
      hooks: NotificationModel.hooks,
      scopes: NotificationModel.scopes,
      validate: NotificationModel.validations,
      tableName: 'notifications',
      sequelize,
      paranoid: true,
    });
  }

  public static associate () {

  }
}

export default NotificationModel;
