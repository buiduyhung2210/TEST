import { DataTypes } from 'sequelize';

const UserNotificationEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  title: {
    type: DataTypes.TEXT, allowNull: false,
  },
  content: {
    type: DataTypes.TEXT, allowNull: false,
  },
  notificationId: {
    type: DataTypes.INTEGER, allowNull: true,
  },
  readAt: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
};

export default UserNotificationEntity;
