import { Model } from "sequelize";

export default function (sequelize, DataTypes) {
  class Store extends Model {
    static associate({ service }) {
      // associations can be defined here
      Store.belongsToMany(service, { through: 'storeservices' });
    }
  }

  Store.init({
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    address2: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zip: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    lng: {
      type: DataTypes.DECIMAL
    },
    hours: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'store'
  });

  return Store;
};
