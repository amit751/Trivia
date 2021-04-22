"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "questions",
      [
        {
          type: 1,
          table_column: "Population",
          tamplate: "Which country is most populous?",
        },
        {
          type: 1,
          table_column: "Population",
          tamplate: "Which country is least populous?",
        },
        {
          type: 1,
          table_column: "Area_km2",
          tamplate: "Which country is the largest by total area?",
        },
        {
          type: 1,
          table_column: "Area_km2",
          tamplate: "Which country is the smallest by total area?",
        },
        {
          type: 1,
          table_column: "Density_popkm2",
          tamplate: "Which country is the most densely populated?",
        },
        {
          type: 1,
          table_column: "Density_popkm2",
          tamplate: "Which country is the least densely populated?",
        },
        {
          type: 1,
          table_column: "Phones_per_1000",
          tamplate: "Which country has the most cell phones per person?",
        },
        {
          type: 1,
          table_column: "Quality_of_Life_Index",
          tamplate: "Which country has the best quality of life?",
        },
        {
          type: 1,
          table_column: "health_care_index",
          tamplate: "Which country has the best Health care?",
        },
        {
          type: 1,
          table_column: "Age_above_65_Years_percentage",
          tamplate: "Which country has the higher elderly people percentage?",
        },

        {
          type: 2,
          table_column: "Capital",
          tamplate: "What is the capital of XXX?",
        },
        {
          type: 2,
          table_column: "Population",
          tamplate: "How many people live in XXX?",
        },
        {
          type: 2,
          table_column: "Continent",
          tamplate: "In what continent is XXX?",
        },

        {
          type: 3,
          table_column: "population",
          tamplate: "Are there more people in XXX than in YYY?",
        },
        {
          type: 3,
          table_column: "area_km2",
          tamplate: "Is XXX larger than YYY?",
        },
        {
          type: 3,
          table_column: "density_popkm2",
          tamplate: "Does XXX have a higher population density than YYY?",
        },
        {
          type: 3,
          table_column: "quality_of_life_index",
          tamplate:
            "Is the quality of life in XXX higher than the quality of life in YYY?",
        },
        {
          type: 3,
          table_column: "crime_index",
          tamplate:
            "Is the crime rate of XXX higher than the crime rate in YYY?",
        },
        {
          type: 3,
          table_column: "cost_of_living_index",
          tamplate: "Is living in XXX more expensive then living in YYY?",
        },
        {
          type: 3,
          table_column: "health_care_index",
          tamplate:
            "Is the health care in XXX better than the health care in YYY?",
        },
      ].map((question, i) => {
        question.id = i + 1;
        question.created_at = new Date();
        question.updated_at = new Date();
        return question;
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("questions", null, {});
  },
};
