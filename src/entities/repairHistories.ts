import { DataTypes } from 'sequelize';

const RepairHistoriesEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  assetId: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  repairDate: {
    type: DataTypes.DATE, allowNull: false,
  },
  problemDetails: {
    type: DataTypes.TEXT, allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default RepairHistoriesEntity;
