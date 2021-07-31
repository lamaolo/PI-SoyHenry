const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("activity", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM,
      values: ["1", "2", "3", "4", "5"],
      allowNull: false
    },
    season: {
      type: DataTypes.ENUM,
      values: ["Verano", "Otoño", "Invierno", "Primavera"],
    },
    duration: {
      type: DataTypes.STRING,
    },
  });
};
