const { productInfo } = require("../services/product.service");

const product = async (req, res) => {
  try {
    const data = await productInfo(req.params.id);

    res.status(200).json({
      success: true,
      result: data
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { product };
