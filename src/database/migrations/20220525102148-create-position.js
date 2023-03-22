'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('positions', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      description: {
        type: Sequelize.TEXT, allowNull: true,
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

  down: async (queryInterface) => {
    return queryInterface.dropTable('positions');
  },
};
