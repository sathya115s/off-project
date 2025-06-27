const express = require("express");
const router = express.Router();
const db = require("../db");

// Existing GET route
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ NEW: POST route to add product
router.post("/", async (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await db.promise().query(
      "INSERT INTO products (name, price, category) VALUES (?, ?, ?)",
      [name, price, category]
    );

    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Insert Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
