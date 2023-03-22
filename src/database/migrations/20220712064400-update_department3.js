'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async transaction => {
      return Promise.all([
        await queryInterface.addConstraint('departments', {
          fields: ['departmentCode', 'deletedAt'],
          type: 'unique',
        }, { transaction: transaction }),
        await queryInterface.removeConstraint('departments', 'unique_code',
          { transaction: transaction }),
      ]);
    });
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      return Promise.all([
        await queryInterface.removeIndex('departments',
          'departments_departmentCode_deletedAt_uk'
          , { transaction: transaction }),
        await queryInterface.addConstraint('departments', { fields: ['departmentCode'], type: 'unique', name: 'unique_code' }
          , { transaction: transaction }),
      ]);
    });
  },
};
