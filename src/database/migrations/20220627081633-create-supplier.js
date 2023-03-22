'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('suppliers', {
      id: {
        type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,
      },
      code: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      describe: {
        type: Sequelize.TEXT, allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      address: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      note: {
        type: Sequelize.STRING(255), allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE, allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE, allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE, allowNull: true,
      },
    }, {
      charset: 'utf8mb4',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('suppliers');
  },
};
