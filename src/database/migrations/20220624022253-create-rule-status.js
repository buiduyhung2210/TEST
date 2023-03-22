'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('rules', 'status', {
      type: Sequelize.ENUM({ values: ['show', 'hide'] }), allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('rules', 'status');
  },
};
