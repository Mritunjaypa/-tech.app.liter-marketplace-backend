const mongoose = require("mongoose");
const Search = require("../models/search.model");


const productInfo = async (id) => {

  // Only fetch products that are available
  let filter = { is_available: true };

  // Check if id is MongoDB ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    filter._id = id;

  // Check if id is numeric (product_id)
  } else if (!isNaN(id)) {
    filter.product_id = Number(id);

  // Invalid id format
  } else {
    throw Object.assign(new Error("Invalid product id"), 
    { statusCode: 400 });
  }

  // Fetch product from database
  const product = await Search.findOne(filter);

  // If product not found
  if (!product) {
    throw Object.assign(new Error("Product not found"), 
    { statusCode: 404 });
  }

  // Return structured API response (NO specifications array)
  return {
    id: product._id,
    productId: product.product_id,
    name: product.name,
    vendor: product.vendor_name,

    // Images
    images: product.primary_image ? [product.primary_image] : [],

    // Status & rating
    verified: product.is_verified,
    rating: product.avg_rating,

    // Pricing
    bulkPrice: product.price,
    retailPrice: product.retail_price,

    
    milkSource: product.milk_source,
    minOrderQuantity: product.min_order_quantity,
    dailySupply: product.supply_capacity_per_day,
    shelfLife: product.shelf_life,
    storage: product.storage,

    // Description
    description: product.description
  };
};

module.exports = { productInfo };
