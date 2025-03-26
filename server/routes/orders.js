const express = require("express");
const router = express.Router();
const { Order, Item } = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: Item,
    });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "No orders found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newOrder = await Order.create();
    const items = req.body.items;
    let totalNumItems = 0;
    let totalPrice = 0;
    for (const item of items) {
      totalNumItems += 1;
      totalPrice += item.price;
    }
    const itemInstances = await Item.findAll({
      where: { id: items.map((item) => item.id) },
    });
    await newOrder.setItems(itemInstances);
    await newOrder.update({
      numItems: totalNumItems,
      totalPrice: totalPrice,
    });
    const orderWithItems = await Order.findOne({
      where: { id: newOrder.id },
      include: [
        {
          model: Item,
        },
      ],
    });
    res.status(201).json(orderWithItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
