import { Model, ModelScopeOptions, ModelValidateOptions, Sequelize } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import UserNotificationInterface from '@interfaces/userNotifications';
import UserNotificationEntity from '@entities/userNotifications';

class UserNotificationModel extends Model<UserNotificationInterface> implements UserNotificationInterface {
  public id: number;
  public title: string;
  public content: string;
  public userId: number;
  public notificationId: number;
  public readAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  static readonly hooks: Partial<ModelHooks<UserNotificationModel>> = {}

  static readonly validations: ModelValidateOptions = {}

  static readonly scopes: ModelScopeOptions = {}

  public static initialize (sequelize: Sequelize) {
    this.init(UserNotificationEntity, {
      hooks: UserNotificationModel.hooks,
      scopes: UserNotificationModel.scopes,
      validate: UserNotificationModel.validations,
      tableName: 'user_notifications',
      sequelize,
      paranoid: false,
    });
  }

  public static associate () {
  }
}

export default UserNotificationModel;
