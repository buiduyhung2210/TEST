'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.changeColumn('assets', 'code', { type: Sequelize.STRING, allowNull: true }
      , { transaction }),
  ])),

  down: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.changeColumn('assets', 'code', { type: Sequelize.STRING, allowNull: false }, { transaction }),
  ])),
};
