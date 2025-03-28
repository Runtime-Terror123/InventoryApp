const path = require("path");
const { Sequelize } = require("sequelize");

let sequelize;

sequelize = new Sequelize({
  dialect: "sqlite",
  logging: false,
  storage: path.join(__dirname, "db.sqlite"),
});

module.exports = sequelize;
