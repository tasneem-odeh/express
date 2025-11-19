const connection = require("../db");

// GET all categories
exports.getCategories = async (req, res) => {
  const categories = await connection.select("*").from("categories");
  res.json(categories);
};

// GET category by id
exports.getCategoryById = async (req, res) => {
  const category = await connection
    .select("*")
    .from("categories")
    .where("id", req.params.id)
    .first();

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.json(category);
};

// POST create category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const [id] = await connection("categories").insert({ name });

    const category = await connection("categories")
      .where("id", id)
      .first();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// PUT update category
exports.updateCategory = async (req, res) => {
  try {
    const updated = await connection("categories")
      .where("id", req.params.id)
      .update(req.body);

    if (!updated) {
      return res.status(404).json({ error: "Category not found" });
    }

    const category = await connection("categories")
      .where("id", req.params.id)
      .first();

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE category
exports.deleteCategory = async (req, res) => {
  const deleted = await connection("categories")
    .where("id", req.params.id)
    .del();

  if (!deleted) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.json({ message: "Category deleted" });
};
