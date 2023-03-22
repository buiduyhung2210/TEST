'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.changeColumn('assets', 'price', { type: Sequelize.INTEGER, allowNull: false }
      , { transaction }),
  ])),

  down: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.changeColumn('assets', 'price', { type: Sequelize.STRING(255), allowNull: false }
      , { transaction }),
  ])),
};
