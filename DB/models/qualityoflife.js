'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QualityOfLife extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QualityOfLife.init({
    country: DataTypes.STRING,
    Quality_of_Life_Index: DataTypes.FLOAT,
    Purchasing_Power_Index: DataTypes.FLOAT,
    Safety_Index: DataTypes.FLOAT,
    Health_Care_Index: DataTypes.FLOAT,
    Cost_of_Living_Index: DataTypes.FLOAT,
    Property_Price_to_Income_Ratio: DataTypes.FLOAT,
    Traffic_Commute_Time_Index: DataTypes.FLOAT,
    Pollution_Index: DataTypes.FLOAT,
    climate_index: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'QualityOfLife',
    underscored: true,
  });
  return QualityOfLife;
};