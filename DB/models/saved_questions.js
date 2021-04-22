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
      rate_5: DataTypes.INTEGER,
      rate_4: DataTypes.INTEGER,
      rate_3: DataTypes.INTEGER,
      rate_2: DataTypes.INTEGER,
      rate_1: DataTypes.INTEGER,
      vote_num: DataTypes.INTEGER,
      avg_vote: DataTypes.FLOAT,
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
