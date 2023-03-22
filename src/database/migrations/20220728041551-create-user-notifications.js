'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT, allowNull: false,
      },
      content: {
        type: Sequelize.TEXT, allowNull: false,
      },
      notificationId: {
        type: Sequelize.INTEGER, allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      readAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    }, {
      charset: 'utf8mb4',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_notifications');
  },
};
