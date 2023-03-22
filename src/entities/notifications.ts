import { DataTypes } from 'sequelize';

const NotificationEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  content: {
    type: DataTypes.TEXT, allowNull: true,
  },
  sendableType: {
    type: DataTypes.ENUM({ values: ['all', 'department', 'employee'] }),
    defaultValue: 'all',
    allowNull: false,
  },
  sendableId: {
    type: DataTypes.TEXT,
    get () {
      const value = this.getDataValue('sendableId');
      return value ? JSON.parse(value) : null;
    },
    set (value: any) {
      return value
        ? this.setDataValue('sendableId', JSON.stringify(value))
        : null;
    },
  },
  sendAt: {
    type: DataTypes.DATE,
  },
  createId: {
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

export default NotificationEntity;
