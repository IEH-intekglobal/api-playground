import { Model } from "sequelize";

export default function (sequelize, DataTypes) {
  class Product extends Model {
    static associate({ category }) {
      Product.belongsToMany(category, {
        through: 'productcategory',
        as: 'categories',
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL
    },
    upc: {
      type: DataTypes.STRING
    },
    shipping: {
      type: DataTypes.DECIMAL
    },
    description: {
      type: DataTypes.STRING
    },
    manufacturer: {
      type: DataTypes.STRING
    },
    model: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return Product;
};
