'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('repair_histories', {
      id: {
        type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,
      },
      assetId: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      repairDate: {
        type: Sequelize.DATE, allowNull: false,
      },
      problemDetails: {
        type: Sequelize.TEXT, allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE, allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE, allowNull: true,
      },
    }, {
      charset: 'utf8mb4',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('repair_histories');
  },
};
