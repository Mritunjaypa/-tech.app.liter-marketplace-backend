const Search = require("../models/search.model");

const getProductInfo = async (productId) => {
  const product = await Search.findOne({
    product_id: Number(productId),
    is_available: true,
  });

  if (!product) return null;
 const [longitude, latitude] = product.location.coordinates;
  return {
    id: product._id,
    productId: product.product_id,
     dairyId: product.dairy_id,
    name: product.name,
    vendorName: product.vendor_name,
    primaryImage: product.primary_image,
    images: product.images || [],
    isVerified: product.is_verified,
    avgRating: product.avg_rating,
    unit: product.unit,
    price: product.price,
    retailPrice: product.retail_price,

    milkSource: product.milk_source,

    minOrderQuantity: product.min_order_quantity,
    dailySupply: product.supply_capacity_per_day,

    shelfLife: product.shelf_life,
    packaging: product.packaging.length ? product.packaging : ["Not specified"],
   locationName: product.location_name,
    description: product.description,
    latitude,
    longitude,

     memberSince: product.createdAt,
  };
};

const getSimilarProductsByDairy = async (dairyId, productId) => {
  return await Search.find({
    dairy_id: Number(dairyId),
    product_id: { $ne: Number(productId) },
    is_available: true,
  });
};

module.exports = {
  getProductInfo,
  getSimilarProductsByDairy,
};
