'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Folder.belongsTo(models.User, {foreignKey: "userId"})
      Folder.hasMany(models.Tweet, {foreignKey: "folderId"})
    }
  }
  Folder.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Folder Name is required"},
        notEmpty: {msg: "Folder Name is required"},
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "User ID is required"},
        notEmpty: {msg: "User ID is required"},
      }
    }
  }, {
    sequelize,
    modelName: 'Folder',
  });
  return Folder;
};