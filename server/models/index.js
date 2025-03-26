const Item = require("./Item");
const User = require("./User");
const Order = require("./Order");

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Item, { through: "OrderItem" });
Item.belongsToMany(Order, { through: "OrderItem" });

module.exports = {
  Item,
  Order,
  User,
};
