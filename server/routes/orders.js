const express = require("express");
const router = express.Router();
const { Order, Item, User } = require("../models/index");
const {CognitoJwtVerifier} = require("aws-jwt-verify");

router.get("/", async (req, res) => {
  try {

    const verifier = CognitoJwtVerifier.create({
      userPoolId: "us-east-1_UUucYZe5a",
      tokenUse: "id",
      clientId: "7gqm3rvsa4noinqp0vcbrv19cq",
    });

    try {
      const payload = await verifier.verify(
          req.headers.authorization // the JWT as string
      );
      console.log(JSON.stringify(payload));

      const orders = await Order.findAll({
        include: [ Item, User ],
        where: {
          "cognitoUserId": payload['cognito:username']
        }
      });
      if (orders) {
        res.status(200).json(orders);
        return
      } else {
        res.status(404).json({ message: "No orders found" });
        return
      }
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: "Not authorized" });
      return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [ Item, User ]
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "No order found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: "us-east-1_UUucYZe5a",
      tokenUse: "id",
      clientId: "7gqm3rvsa4noinqp0vcbrv19cq",
    });

    try {
      const payload = await verifier.verify(
          req.headers.authorization // the JWT as string
      );

      const newOrder = await Order.create({cognitoUserId: payload['cognito:username']});
      const items = req.body.items;

      // Create hash map of items and their quantities ex: {3: 2, 2: 1}
      const itemCountMap = items.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1; // Counting each item by its ID
        return acc;
      }, {});

      let totalNumItems = 0;
      let totalPrice = 0;

      const itemInstances = await Item.findAll({
        where: { id: Object.keys(itemCountMap) },
      });

      // Loop through db items
      for (const itemInstance of itemInstances) {
        const quantity = itemCountMap[itemInstance.id];
        totalNumItems += quantity;
        totalPrice += itemInstance.price * quantity;

        // Update join table @ quantity column
        await newOrder.addItem(itemInstance, { through: { quantity } });
      }

      // Update Order columns
      await newOrder.update({
        numItems: totalNumItems,
        totalPrice: totalPrice,
      });

      const orderWithItems = await Order.findOne({
        where: { id: newOrder.id },
        include: [{ model: Item }],
      });

      // Return order data w/ items to frontend
      res.status(201).json(orderWithItems);
    } catch (e) {
      res.status(500).json({ message: "Not authorized" });
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
