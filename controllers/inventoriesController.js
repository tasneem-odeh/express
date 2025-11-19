const connection = require("../db");

// GET inventories
exports.getInventories = async (req, res) => {
  const inventories = await connection.select("*").from("inventories");
  res.json(inventories);
};

// GET inventory by id
exports.getInventoryById = async (req, res) => {
  const inv = await connection
    .select("*")
    .from("inventories")
    .where("id", req.params.id)
    .first();

  if (!inv) {
    return res.status(404).json({ error: "Inventory not found" });
  }

  res.json(inv);
};

// POST create inventory
exports.createInventory = async (req, res) => {
  try {
    const { product_id, quantity, name } = req.body;

    const [id] = await connection("inventories").insert({
      product_id,
      quantity,
      name
    });

    const inventory = await connection("inventories")
      .where("id", id)
      .first();

    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update inventory
exports.updateInventory = async (req, res) => {
  try {
    const updated = await connection("inventories")
      .where("id", req.params.id)
      .update(req.body);

    if (!updated) {
      return res.status(404).json({ error: "Inventory not found" });
    }

    const inv = await connection("inventories")
      .where("id", req.params.id)
      .first();

    res.json(inv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE inventory
exports.deleteInventory = async (req, res) => {
  const deleted = await connection("inventories")
    .where("id", req.params.id)
    .del();

  if (!deleted) {
    return res.status(404).json({ error: "Inventory not found" });
  }

  res.json({ message: "Inventory deleted" });
};
