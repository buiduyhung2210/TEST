'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('suppliers', 'bankAccount', {
      type: Sequelize.STRING, allowNull: true,
    });
    await queryInterface.addColumn('suppliers', 'taxCode', {
      type: Sequelize.STRING, allowNull: true,
    });
    await queryInterface.addColumn('suppliers', 'category', {
      type: Sequelize.STRING, allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('suppliers', 'bankAccount');
    await queryInterface.removeColumn('suppliers', 'taxCode');
    await queryInterface.removeColumn('suppliers', 'category');
  },
};
