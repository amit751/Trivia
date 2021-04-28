"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Saved_Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Saved_Questions.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
      option_1: DataTypes.TEXT,
      option_2: DataTypes.TEXT,
      option_3: DataTypes.TEXT,
      option_4: DataTypes.TEXT, 
      tamplate_id: DataTypes.INTEGER,
      question_type: DataTypes.INTEGER,
      avg_rate: DataTypes.FLOAT,
      total_rating: DataTypes.INTEGER,
      total_votes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Saved_Questions",
      tableName: "saved_questions",
      underscored: true,
    }
  );
  return Saved_Questions;
};
