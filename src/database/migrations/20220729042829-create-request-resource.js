'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('request_resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      source: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      requestAbleType: {
        type: Sequelize.STRING(255), allowNull: false,
      },
      requestAbleId: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      type: {
        type: Sequelize.ENUM({ values: ['image', 'video', 'file'] }),
        defaultValue: 'image',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    }, {
      charset: 'utf8mb4',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('request_resources');
  },
};
