const connection = require("../db");

// GET products?limit=10&page=1
exports.getProducts = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const products = await connection
      .select("*")
      .from("products")
      .limit(limit)
      .offset(offset);

    if (products.length === 0) {
      return res.status(200).json([]);
    }

    const productImages = await connection
      .select("*")
      .from("product_images")
      .whereIn(
        "product_id",
        products.map((product) => product.id)
      );

    // const categories = await connection
    //   .select("*")
    //   .from("categories")
    //   .whereIn(
    //     "id",
    //     products.map((p) => p.category_id)
    //   );

    // const inventories = await connection
    //   .select("*")
    //   .from("inventories")
    //   .whereExists(
    //     connection
    //       .select("*")
    //       .from("product_inventories")
    //       .where(
    //         "inventories.id",
    //         connection.ref("product_inventories.inventory_id")
    //       )
    //       .whereIn(
    //         "product_inventories.product_id",
    //         products.map((p) => p.id)
    //       )
    //   );

    // products.forEach((product) => {
    //   product.images = productImages
    //     .filter((productImage) => productImage.product_id === product.id)
    //     .map((productImage) => productImage.image_url);

    //   product.category = categories.find((c) => c.id === product.category_id);

    //   product.inventories = inventories
    //     .filter((inv) => inv.product_id === product.id)
    //     .map((inv) => ({
    //       id: inv.id,
    //       name: inv.name,
    //     }));
    // });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

// GET products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await connection
      .select("*")
      .from("products")
      .where("id", req.params.id)
      .first();
 
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

    const productImages = await connection
      .select("*")
      .from("product_images")
      .where("product_id", req.params.id);


      const category = await connection
      .select("*")
      .from("categories")
      .where(
        "id", product.category_id
        
      )
      .first();

      const inventories = await connection
      .select("*")
      .from("inventories")
      .whereExists(
        connection
          .select("*")
          .from("product_inventories")
          .where(
            "inventories.id",
            connection.ref("product_inventories.inventory_id")
          )
          .where(
            "product_inventories.product_id",
          product.id
          )
      );

      

    product.images = productImages.map(
      (productImage) => productImage.image_url
    );



    product.category = category;
    product.inventories = inventories;
   

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// POST products
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;
    const [id] = await connection("products").insert({ name, price, quantity });
    const product = await connection("products").where("id", id).first();

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// PUT products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const updated = await connection("products")
      .where("id", req.params.id)
      .update(req.body);

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = await connection("products")
      .where("id", req.params.id)
      .first();

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// DELETE products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await connection("products")
      .delete()
      .where("id", req.params.id)
      .into("products");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
