'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('history_user_requests', {
      id: {
        type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
      },
      requestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING({ values: ['created', 'viewed', 'approved', 'rejected', 'processed'] }),
        defaultValue: 'created',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      charset: 'utf8mb4',
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('history_user_requests');
  },
};
