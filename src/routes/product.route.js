const express = require("express");
const { product } = require("../controllers/product.controller");

const router = express.Router();

router.get("/:id", product);

module.exports = router;
