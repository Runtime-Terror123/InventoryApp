const express = require("express");
const { Item } = require("../models");

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

  router.get("/", async (req,res) => {
    try{
      const items = await Items.findAll();
      res.json(items)
    } catch (error){
      res.status(500).send({ message:"Cannot find all items"})
    }
  })
});
module.exports = router;
