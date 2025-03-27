const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class OrderItem extends Model {}

OrderItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
  }
);

module.exports = OrderItem;
