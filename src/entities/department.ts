import { DataTypes } from 'sequelize';

const DepartmentEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  departmentName: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  departmentCode: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  managerId: {
    type: DataTypes.INTEGER, allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  assetNumber: {
    type: DataTypes.INTEGER, defaultValue: 0,
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

export default DepartmentEntity;
