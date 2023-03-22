'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('history_user_requests', 'userId');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('history_user_requests', 'userId', {
      type: Sequelize.INTEGER, allowNull: true,
    });
  },
};
