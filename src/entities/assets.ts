import { DataTypes } from 'sequelize';

const AssetEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  code: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: { msg: 'Giá trị nhập không hợp lệ' },
      notEmpty: { msg: 'Giá trị nhập không hợp lệ' },
    },
  },
  categoryId: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  supplierId: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detail: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  status: {
    type: DataTypes.ENUM({ values: ['beingUsed', 'spare', 'broken', 'sold'] }), defaultValue: 'spare',
  },
  type: {
    type: DataTypes.ENUM({ values: ['personal', 'general'] }), defaultValue: 'general',
  },
  boughtDate: {
    type: DataTypes.DATE,
  },
  warrantyExpriedDate: {
    type: DataTypes.DATE,
  },
  purchaseInformation: {
    type: DataTypes.STRING(255),
  },
  note: {
    type: DataTypes.STRING(255),
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

export default AssetEntity;
