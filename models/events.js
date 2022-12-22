'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  events.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};