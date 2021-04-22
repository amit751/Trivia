"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("All_Data", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.STRING,
      },
      Phones_per_1000: {
        type: Sequelize.FLOAT,
      },
      Capital: {
        type: Sequelize.STRING,
      },
      Continent: {
        type: Sequelize.STRING,
      },
      Cost_of_Living_Index: {
        type: Sequelize.FLOAT,
      },
      Age_above_65_Years_percentage: {
        type: Sequelize.INTEGER,
      },
      crime_index: {
        type: Sequelize.FLOAT,
      },
      health_care_index: {
        type: Sequelize.FLOAT,
      },
      Quality_of_Life_Index: {
        type: Sequelize.FLOAT,
      },
      Population: {
        type: Sequelize.INTEGER,
      },
      Area_km2: {
        type: Sequelize.INTEGER,
      },
      Density_popkm2: {
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
    await queryInterface.dropTable("All_Data");
  },
};
