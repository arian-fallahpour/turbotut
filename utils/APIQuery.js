const excludedFields = ["page", "sort", "limit", "select", "search"];
import queryStr from "query-string";

class APIQuery {
  queryClone;

  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;
  }

  filter() {
    const filteredQueryObject = { ...this.queryObject };
    excludedFields.forEach((el) => delete filteredQueryObject[el]);

    // Add $gt, $gte, $lt, $lte operators
    let queryString = JSON.stringify(filteredQueryObject);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Update mongoose query
    this.query = this.query.find(JSON.parse(queryString));
    this.queryClone = this.query.clone();

    return this;
  }

  sort() {
    // Sort by the query
    if (this.queryObject.sort) {
      let sortString = this.queryObject.sort.split(",");
      sortString = sortString.map((str) => str.trim()); // Remove extra spaces
      sortString = sortString.join(" ");

      this.query = this.query.sort(sortString);
    }

    // Otherwise sort by creation date
    else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  search() {
    if (this.queryObject.search) {
      this.query = this.query.fuzzySearch(this.queryObject.search);
    }

    return this;
  }

  select() {
    // Limit by query
    if (!!this.queryObject.select) {
      const fields = this.queryObject.select.split(",").join(" ");
      this.query = this.query.select(fields);
    }

    // Limit by version?
    else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  populate() {
    // if (this.queryObject.populate) {
    //   this.queryObject.populate.forEach

    // }

    return this;
  }

  paginate() {
    const page = this.queryObject.page * 1 || 1;
    const limit = Math.min(this.queryObject.limit * 1 || 10, 50);
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
