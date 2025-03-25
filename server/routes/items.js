const express = require("express");
const { Item } = require("../models");
const { findAll } = require("../models/Item");

const router = express.Router();
router.use(express.json());

// Define your routes here
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json(item);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
})

router.get("/", async (req,res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
})
module.exports = router;
