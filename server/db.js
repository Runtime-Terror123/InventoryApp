const path = require("path");
const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    logging: false,
    storage: path.join(__dirname, "db.sqlite"),
  });
} else {
    const password = process.env.DB_PASSWORD;
    sequelize = new Sequelize(`postgresql://inventoryappdatabase_nvc5_user:${password}@dpg-cvi8l22dbo4c73d916j0-a.oregon-postgres.render.com/inventoryappdatabase_nvc5?ssl=true`, {
      dialect: 'postgres',
      logging: false,
    });
}

module.exports = sequelize;
