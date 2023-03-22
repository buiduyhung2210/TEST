import { DataTypes } from 'sequelize';

const UserRequestEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  describe: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM({ values: ['waitingApproval', 'processing', 'processed', 'denied', 'cancelled'] }),
    defaultValue: 'waitingApproval',
  },
  adminNote: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rejectReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  code: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
};

export default UserRequestEntity;
