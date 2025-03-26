const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Order extends Model {}

Order.init(
  {
    numItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

module.exports = Order;
