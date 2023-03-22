'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_requests', 'adminId', {
      type: Sequelize.INTEGER, allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_requests', 'adminId');
  },
};
