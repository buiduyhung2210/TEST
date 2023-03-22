'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_requests', 'types');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_requests', 'types', {
      type: Sequelize.ENUM({ values: ['equipment', 'profile'] }),
      defaultValue: 'profile',
    });
  },
};
