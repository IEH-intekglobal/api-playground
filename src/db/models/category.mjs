import { Model } from "sequelize";

export default function (sequelize, DataTypes) {
  class Category extends Model {
    static associate(models) {
      // associations can be defined here
      Category.belongsToMany(Category, { as: 'subCategories', through: 'subcategories' });
      Category.belongsToMany(Category, { as: 'categoryPath', through: 'categorypath' });      
    }
  }
  Category.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'category',
  });

  return Category;
};
