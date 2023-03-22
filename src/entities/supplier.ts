import { DataTypes } from 'sequelize';

const SupplierEntity = {
  id: {
    type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  describe: {
    type: DataTypes.TEXT, allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  note: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  bankAccount: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
  },
  taxCode: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE, allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE, allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE, allowNull: true,
  },
};

export default SupplierEntity;
