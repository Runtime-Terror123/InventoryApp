const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Order extends Model {
  // async updateTotalPrice() {
  //   const items = await this.getItems();
  //   let totalPrice = items.reduce((sum, item) => {
  //     return sum + item.price;
  //   }, 0);
  //   await this.update({ totalPrice });
  // }

  // async updateNumItems() {
  //   const items = await this.getItems();
  //   console.log(items, "this is the order's items");
  //   console.log(items.length, "Num items")
  //   return items.length;
  // }
}

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
    // hooks: {
    //   afterCreate: async (order) => {
    //     await order.updateTotalPrice();
    //     await order.updateNumItems();
    //   },
    //   afterUpdate: async (order) => {
    //     await order.updateTotalPrice();
    //     await order.updateNumItems();
    //   },
    //   afterDestroy: async (order) => {
    //     await order.updateTotalPrice();
    //     await order.updateNumItems();
    //   },
    // },
  }
);

module.exports = Order;
