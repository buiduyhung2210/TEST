'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_requests', 'deadline');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_requests', 'deadline', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
