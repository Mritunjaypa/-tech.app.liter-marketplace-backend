const { searchListings } = require("../services/search.service");

const search = async (req, res) => {
  try {
    const result = await searchListings(req.query);

    res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      results: result,
    });
  } catch (error) {
    // Check if it's a validation error (400) or server error (500)
    const statusCode = error.statusCode || 500;
    const responseData = {
      success: false,
      message: error.message || "Something went wrong while searching",
    };

    // Include validation error details if available
    if (error.errors) {
      responseData.errors = error.errors;
    }

    console.error("Search Error:", error);
    res.status(statusCode).json(responseData);
  }
};

module.exports = { search };
