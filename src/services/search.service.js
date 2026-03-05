const Search = require("../models/search.model");
const { paginate } = require("../utils/pagination");

const searchListings = async (query) => {
  // Get and clean search keyword
  const searchWord = (query.q || "").trim();

  // Get and clean location
  const locationWord = (query.location || "").trim();

  // Pagination values
  const pageNumber = parseInt(query.page) || 1;
  const resultsPerPage = parseInt(query.limit) || 10;

  // MongoDB filter object
  const searchRules = {};

  //  Text Search (product name / vendor / keywords)
  if (searchWord) {
    searchRules.$or = [
      { name: { $regex: searchWord, $options: "i" } },
      { vendor_name: { $regex: searchWord, $options: "i" } },
      { keywords: { $regex: searchWord, $options: "i" } },
    ];
  }

  if (locationWord) {
  searchRules.location_name = { $regex: locationWord, $options: "i" };
}
  // Return paginated search result
  return paginate({
    model: Search,
    filter: searchRules,
    sort: { updatedAt: -1 }, // newest first
    page: pageNumber,
    limit: resultsPerPage,
  });
};

module.exports = { searchListings };