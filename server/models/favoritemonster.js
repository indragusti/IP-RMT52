"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FavoriteMonster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FavoriteMonster.init(
    {
      userId: DataTypes.INTEGER,
      monsterId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "FavoriteMonster",
    }
  );
  return FavoriteMonster;
};
