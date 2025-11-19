const express = require("express");
const router = express.Router();
const inventoriesController = require("../controllers/inventoriesController");

router.get("/", inventoriesController.getInventories);
router.get("/:id", inventoriesController.getInventoryById);
router.post("/", inventoriesController.createInventory);
router.put("/:id", inventoriesController.updateInventory);
router.delete("/:id", inventoriesController.deleteInventory);

module.exports = router;
