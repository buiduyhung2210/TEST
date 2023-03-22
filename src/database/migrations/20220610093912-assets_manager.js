'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('assets', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      code: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      price: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      detail: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      status: {
        type: Sequelize.ENUM({ values: ['beingUsed', 'spare', 'broken', 'sold'] }), defaultValue: 'spare',
      },
      type: {
        type: Sequelize.ENUM({ values: ['personal', 'general'] }), defaultValue: 'general',
      },
      boughtDate: {
        type: Sequelize.DATE,
      },
      warrantyExpriedDate: {
        type: Sequelize.DATE,
      },
      purchaseInformation: {
        type: Sequelize.STRING(255),
      },
      note: {
        type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('assets');
  },
};
