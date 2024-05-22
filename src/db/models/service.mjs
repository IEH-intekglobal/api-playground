import { Model } from "sequelize";

export default function (sequelize, DataTypes) {
  class Service extends Model {
    static associate({ store }) {
      Service.belongsToMany(store, { through: 'storeservices' })
    }
  }

  Service.init({
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'service'
  });

  return Service;
};
