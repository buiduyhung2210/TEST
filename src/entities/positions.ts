import { DataTypes } from 'sequelize';

const PositionEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, allowNull: true,
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

export default PositionEntity;
