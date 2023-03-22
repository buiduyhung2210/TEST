'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('categories', 'prefix', {
      type: Sequelize.STRING, allowNull: false, unique: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('categories', 'prefix');
  },
};
