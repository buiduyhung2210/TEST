import { DataTypes } from 'sequelize';

const CategoryEntity = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING(255), allowNull: false,
  },
  type: {
    type: DataTypes.ENUM({ values: ['asset'] }), allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  prefix: {
    type: DataTypes.STRING(255), allowNull: false,
  },
};

export default CategoryEntity;
