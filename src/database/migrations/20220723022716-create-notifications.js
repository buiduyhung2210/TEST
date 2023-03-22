'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(255), allowNull: true,
      },
      content: {
        type: Sequelize.TEXT, allowNull: true,
      },
      sendableType: {
        type: Sequelize.ENUM({ values: ['all', 'department', 'employee'] }),
        defaultValue: 'all',
        allowNull: false,
      },
      sendableId: {
        type: Sequelize.TEXT, allowNull: true,
      },
      createId: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      sendAt: {
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
    await queryInterface.dropTable('notifications');
  },
};
