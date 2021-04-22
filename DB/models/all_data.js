"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class All_Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  All_Data.init(
    {
      country: DataTypes.STRING,
      Phones_per_1000: DataTypes.FLOAT,
      Capital: DataTypes.STRING,
      Continent: DataTypes.STRING,
      Cost_of_living_index: DataTypes.FLOAT,
      Age_above_65_years_percentage: DataTypes.INTEGER,
      crime_index: DataTypes.FLOAT,
      health_care_index: DataTypes.FLOAT,
      Quality_of_life_index: DataTypes.FLOAT,
      Population: DataTypes.INTEGER,
      Area_km2: DataTypes.INTEGER,
      Density_popkm2: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "All_Data",
      tableName: "all_data",
      underscored: true,
    }
  );
  return All_Data;
};
