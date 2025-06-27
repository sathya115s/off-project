const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /order
router.post("/", async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    const conn = db.promise();

    for (const item of items) {
      await conn.query(
        "INSERT INTO orders (product_id, product_name, price) VALUES (?, ?, ?)",
        [item.id, item.name, item.price]
      );
    }

    res.status(201).json({ message: "Order saved successfully" });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
