const express = require("express");
const router = express.Router();
const { Item } = require("../models/index");
const { Op } = require("sequelize");
const {validationResult, matchedData, checkSchema} = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

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

const validationSchema = {
  name: { notEmpty: true },
  description: { notEmpty: true },
  image: {},
  category: { notEmpty: true },
  price: {
    isLength: {
      options: { min: 0 },
    }
  },
}

router.post("/", checkSchema(validationSchema), async (req, res) => {
  try {
    const result = validationResult(req)
    if(result.isEmpty() === false) {
      return res.status(500).json( { errors: result.array() });
    }
    const data = matchedData(req)

    const item = await Item.create(data);
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", checkSchema(validationSchema), async (req, res) => {
  try {
    const result = validationResult(req)
    if(result.isEmpty() === false) {
      return res.status(500).json( { errors: result.array() });
    }
    const data = matchedData(req)

    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.update(data);
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.status(201).json({ message: "Item deleted successfully"});
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req,res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
})

router.post("/search", async (req,res) => {
  try {
    const items = await Item.findAll({
      where: {
        name: {
          [Op.like]: `%${req.body.query}%`
        },
      }
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
})
module.exports = router;
