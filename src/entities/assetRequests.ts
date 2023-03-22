import { DataTypes } from 'sequelize';

const AssetRequestsEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Tiêu đề không được để trống',
      },
    },
  },
  describe: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Mô tả không được để trống',
      },
    },
  },
  status: {
    type: DataTypes.ENUM({ values: ['waitingApproval', 'processing', 'processed', 'denied', 'cancelled'] }),
    defaultValue: 'waitingApproval',
  },
  assetCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  procedure: {
    type: DataTypes.ENUM({ values: ['recall', 'renew'] }),
    allowNull: true,
  },
  adminNote: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  assetId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dateProcess: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  adminId: {
    type: DataTypes.INTEGER,
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
};

export default AssetRequestsEntity;
