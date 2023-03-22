'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('departments', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      departmentName: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      managerId: {
        type: Sequelize.INTEGER, allowNull: true,
      },
      address: {
        type: Sequelize.STRING(255), allowNull: true,
      },
      asssetNumber: {
        type: Sequelize.INTEGER, defaultValue: 0,
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
    return queryInterface.dropTable('departments');
  },
};
