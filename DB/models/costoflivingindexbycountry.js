'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CostOfLivingIndexByCountry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CostOfLivingIndexByCountry.init({
    country: DataTypes.STRING,
    cost_of_living_index: DataTypes.FLOAT,
    rent_index: DataTypes.FLOAT,
    cost_of_living_plus_rent_index: DataTypes.FLOAT,
    groceries_index: DataTypes.FLOAT,
    restaurant_price_index: DataTypes.FLOAT,
    local_purchasing_power_index: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'CostOfLivingIndexByCountry',
    underscored: true,
  });
  return CostOfLivingIndexByCountry;
};