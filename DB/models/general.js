'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class General extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  General.init({
    region: DataTypes.STRING,
    coastline_coast_area_ratio: DataTypes.STRING,
    net_migration: DataTypes.INTEGER,
    infant_mortality_per_1000_births: DataTypes.FLOAT,
    GDP_perCapita: DataTypes.INTEGER,
    literacy % : DataTypes.FLOAT,
    phones_per1000: DataTypes.FLOAT,
    arable % : DataTypes.FLOAT,
    crops % : DataTypes.FLOAT,
    other % : DataTypes.FLOAT,
    climate: DataTypes.INTEGER,
    birthrate: DataTypes.FLOAT,
    deathrate: DataTypes.FLOAT,
    agriculture: DataTypes.FLOAT,
    industry: DataTypes.FLOAT,
    service: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'General',
    underscored: true,
  });
  return General;
};