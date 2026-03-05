const {
  getProductInfo,
  getSimilarProductsByDairy,
} = require("../services/product.service");
const product = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const productData = await getProductInfo(productId);
    if (!productData) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
     const similarProducts = await getSimilarProductsByDairy(
      productData.dairyId,
      productData.productId
    );
     res.status(200).json({
      success: true,
      result: {
        product: productData,
        similarProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { product };