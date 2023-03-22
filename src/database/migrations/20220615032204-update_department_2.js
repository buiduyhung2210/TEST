'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.addConstraint('departments', { fields: ['departmentCode'], type: 'unique', name: 'unique_code' }
      , { transaction }),
  ])),

  down: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.removeConstraint('departments', 'unique_code',
      { transaction }),
  ])),
};
