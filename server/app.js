// load environment variables from .env or elsewhere
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Allow CORS
app.use(cors());

// logging middleware
app.use(morgan("dev"));

// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, "../dist")));

// api router
app.use("/api", require("./routes"));


// Redirect 404s to react
app.get('*', (req, res) => {
  res.sendFile(path.join('dist', 'index.html'), { root: path.resolve(__dirname, '..') });
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);

  if (res.statusCode < 400) {
    res.status(500);
  }

  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

module.exports = app;
