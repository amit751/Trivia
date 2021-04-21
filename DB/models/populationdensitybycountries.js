'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PopulationDensityByCountries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PopulationDensityByCountries.init({
    rank: DataTypes.INTEGER,
    country_or_dependent_territory: DataTypes.STRING,
    area_km2: DataTypes.FLOAT,
    area_mi2: DataTypes.FLOAT,
    population: DataTypes.INTEGER,
    density_pop. / km2: DataTypes.FLOAT,
    density_pop. / mi2: DataTypes.FLOAT,
    date: DataTypes.TEXT,
    population_source: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PopulationDensityByCountries',
    underscored: true,
  });
  return PopulationDensityByCountries;
};