'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Saved_Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      options: {
        type: Sequelize.TEXT
      },
      rate_5: {
        type: Sequelize.INTEGER
      },
      rate_4: {
        type: Sequelize.INTEGER
      },
      rate_3: {
        type: Sequelize.INTEGER
      },
      rate_2: {
        type: Sequelize.INTEGER
      },
      rate_1: {
        type: Sequelize.INTEGER
      },
      vote_num: {
        type: Sequelize.INTEGER
      },
      avg_vote: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Saved_Questions');
  }
};