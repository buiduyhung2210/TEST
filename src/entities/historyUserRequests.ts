import { DataTypes } from 'sequelize';

const HistoryUserRequestEntity = {
  id: {
    type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
  },
  requestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM({ values: ['created', 'viewed', 'approved', 'rejected', 'processed'] }),
    defaultValue: 'created',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

export default HistoryUserRequestEntity;
