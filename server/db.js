const path = require("path");
const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV !== "production") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    logging: false,
    storage: path.join(__dirname, "db.sqlite"),
  });
} else {
  const POSTGRES_URI = process.env.POSTGRES_URI;
  sequelize = new Sequelize(POSTGRES_URI, {
    dialect: "postgres",
    logging: false,
  });
}

module.exports = sequelize;
