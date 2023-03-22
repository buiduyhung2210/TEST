'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_requests', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      types: {
        type: Sequelize.ENUM({ values: ['equipment', 'profile'] }),
        defaultValue: 'profile',
      },
      describe: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM({ values: ['waitingApproval', 'processing', 'processed', 'denied', 'cancelled'] }),
        defaultValue: 'waitingApproval',
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      adminNote: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rejectReason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }, {
      charset: 'utf8mb4',
    });
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('user_requests');
  },
};
