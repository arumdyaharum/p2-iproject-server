'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tweet.belongsTo(models.Folder, {foreignKey: "folderId"})
    }
  }
  Tweet.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Description is required"},
        notEmpty: {msg: "Description is required"},
      }
    },
    theme: {
      type: DataTypes.STRING,
      defaultValue: "light",
      allowNull: false,
      validate: {
        notNull: {msg: "Theme is required"},
        notEmpty: {msg: "Theme ID is required"},
      }
    },
    tweetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Tweet ID is required"},
        notEmpty: {msg: "Tweet ID is required"},
      }
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Folder ID is required"},
        notEmpty: {msg: "Folder ID is required"},
      }
    }
  }, {
    sequelize,
    modelName: 'Tweet',
  });
  return Tweet;
};