'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'asset_requests',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        describe: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM({
            values: [
              'waitingApproval',
              'processing',
              'processed',
              'denied',
              'cancelled',
            ],
          }),
          defaultValue: 'waitingApproval',
        },
        assetCategoryId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        deadline: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        code: {
          type: Sequelize.STRING(255),
          allowNull: true,
          unique: true,
        },
        procedure: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        assetId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        dateProcess: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        adminId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        rejectReason: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        adminNote: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        charset: 'utf8mb4',
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('asset_requests');
  },
};
