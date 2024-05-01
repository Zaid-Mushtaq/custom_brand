class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  suggestions() {
    const keyword = this.queryStr.keyword;
    if (keyword) {
      const suggestionQuery = {
        name: {
          $regex: `^${keyword}`,
          $options: "i",
        },
      };
      const suggestions = this.query.find(suggestionQuery).limit(5);

      return suggestions;
    }

    return null;
  }

  category() {
    const categoryFilter = this.queryStr.category
      ? {
          category: this.queryStr.category.toLowerCase(),
        }
      : {};
    this.query = this.query.find({ ...categoryFilter });
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      let sortedBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortedBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  filter() {
    let queryCopy = { ...this.queryStr };

    // Remove Some field for category
    const removeFields = [
      "keyword",
      "sort",
      "limit",
      "page",
      "category",
      "suggestions",
    ];
    removeFields.forEach((ele) => delete queryCopy[ele]);

    // 2) Advanced Filtering
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    this.query = this.query.limit(resultPerPage);
    return this;
  }
}

module.exports = ApiFeatures;
