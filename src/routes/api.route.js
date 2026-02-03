const express = require("express");
const router = express.Router();

// Import all route files
const searchRoutes = require("./search.route");
const  product = require("./product.route");

router.use("/search", searchRoutes);
router.use("/product", product );


module.exports = router;
