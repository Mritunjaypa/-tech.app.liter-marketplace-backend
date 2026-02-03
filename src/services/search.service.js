const Search = require("../models/search.model");
const { paginate } = require("../utils/pagination");

const searchListings = async (query) => {
  // Get and clean search keyword
  const searchWord = (query.q || "").trim();

  // Pagination values
  const pageNumber = query.page || 1;
  const resultsPerPage = query.limit || 10;

  // MongoDB filter object
  const searchRules = {};

 
  searchRules.$or = [
    { name: { $regex: searchWord, $options: "i" } },
    { vendor_name: { $regex: searchWord, $options: "i" } },
    { keywords: { $regex: searchWord, $options: "i" } },
  ];

  // Return paginated search result
  return paginate({
    model: Search,
    filter: searchRules,
    sort: { updatedAt: -1 }, // Newest first
    page: pageNumber,
    limit: resultsPerPage,
  });
};

module.exports = { searchListings };
