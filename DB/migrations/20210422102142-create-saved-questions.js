"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Saved_Questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING,
      },
      option_1: {
        type: Sequelize.TEXT,
      },
      option_2: {
        type: Sequelize.TEXT,
      },
      option_3: {
        type: Sequelize.TEXT,
      },
      option_4: {
        type: Sequelize.TEXT,
      },
      tamplate_id: {
        type: Sequelize.INTEGER,
      },
      question_type: {
        type: Sequelize.INTEGER,
      },
      avg_rate: {
        type: Sequelize.FLOAT,
      },
      total_rating:{
        type: Sequelize.INTEGER,
      },
      total_votes: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Saved_Questions");
  },
};
