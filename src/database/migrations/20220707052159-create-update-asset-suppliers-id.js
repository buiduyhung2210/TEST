'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('assets', 'supplierId', {
      type: Sequelize.INTEGER, allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('assets', 'supplierId');
  },
};
