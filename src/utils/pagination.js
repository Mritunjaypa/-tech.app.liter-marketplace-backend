// PAGINATION HELPER - Shows data in pages (page 1, 2, 3...)

const paginate = async ({
  model,           // Mongoose model (Product, Search, User, etc.)
  filter = {},     // MongoDB filter object
  sort = {},       // Sorting rule
  page = 1,        // Page number
  limit = 10       // Items per page
}) => {

  // Ensure valid numbers
  const pageNumber = Math.max(Number(page), 1);
  const itemsPerPage = Math.max(Number(limit), 1);

  // Calculate skip value
  const itemsToSkip = (pageNumber - 1) * itemsPerPage;

  // Fetch paginated data + total count
  const [data, totalItems] = await Promise.all([
    model
      .find(filter)
      .sort(sort)
      .skip(itemsToSkip)
      .limit(itemsPerPage),

    model.countDocuments(filter)
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Return response
  return {
    data,
    pagination: {
      currentPage: pageNumber,
      itemsPerPage,
      totalItems,
      totalPages
    }
  };
};

module.exports = { paginate };
