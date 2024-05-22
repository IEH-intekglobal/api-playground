import { Model } from "sequelize";

export default function (sequelize, DataTypes) {
  class Service extends Model { }

  Service.init({
    zip: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    lng: {
      type: DataTypes.DECIMAL
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'zipcode',
  });
  return Service;
};
