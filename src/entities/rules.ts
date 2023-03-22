import { DataTypes } from 'sequelize';

const RuleEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  content: {
    type: DataTypes.TEXT, allowNull: true,
  },
  status: {
    type: DataTypes.ENUM({ values: ['show', 'hide'] }), allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default RuleEntity;
