'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.addColumn('categories', 'type',
      { type: Sequelize.ENUM({ values: ['asset'] }), allowNull: false }
      , { transaction }),
    queryInterface.removeColumn('categories', 'parentId', { transaction }),
  ])),

  down: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.removeColumn('categories', 'type', { transaction }),
    queryInterface.addColumn('categories', 'parentId', {
      type: Sequelize.INTEGER, allowNull: true,
    }, { transaction }),
  ])),
};
