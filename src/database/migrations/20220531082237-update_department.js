'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.addColumn('departments', 'departmentCode',
      { type: Sequelize.STRING(225), allowNull: true }
      , { transaction }),
    queryInterface.renameColumn('departments', 'asssetNumber', 'assetNumber', { transaction }),
  ])),

  down: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.removeColumn('departments', 'departmentCode', { transaction }),
    queryInterface.renameColumn('departments', 'assetNumber', 'asssetNumber', { transaction }),
  ])),
};
