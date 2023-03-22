'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('asset_resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      source: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      assetId: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      type: {
        type: Sequelize.ENUM({ values: ['image', 'video', 'file'] }), defaultValue: 'image',
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    }, {
      charset: 'utf8mb4',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('asset_resources');
  },
};
