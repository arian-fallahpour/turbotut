const excludedFields = ["page", "sort", "limit", "select", "search"];
import queryStr from "query-string";

class APIQuery {
  queryClone;

  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = queryStr.parse(this.queryString);
    excludedFields.forEach((el) => delete queryObj[el]);

    // Add $gt, $gte, $lt, $lte operators
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Update mongoose query
    this.query = this.query.find(JSON.parse(queryString));
    this.queryClone = this.query.clone();

    return this;
  }

  sort() {
    // Sort by the query
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }

    // Otherwise sort by creation date
    else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  search() {
    if (this.queryString.search) {
      this.query = this.query.fuzzySearch(this.queryString.search);
    }

    return this;
  }

  select() {
    // Limit by query
    if (this.queryString.select) {
      const fields = this.queryString.select.split(",").join(" ");
      this.query = this.query.select(fields);
    }

    // Limit by version?
    else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  populate() {
    if (this.queryString.populate) {
    }
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = Math.min(this.queryString.limit * 1 || 10, 50);
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  async getTotalCount() {
    const docs = await this.queryClone.select({ _id: 1 });
    return docs.length;
  }

  async execute() {
    return await this.query;
  }
}

export default APIQuery;
