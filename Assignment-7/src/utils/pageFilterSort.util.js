const { ERRORS } = require("../constants/messages.constants");
const CODES = require("../constants/codes.constants");

// Utility Helper Function to perform Paging, Filtering, Sorting
const pageFilterSortUtil = {
  /**
   *
   * @param {data} is the array of objects to be filtered
   * @param {constraints} is an array of objects containing the filter conditions
   * @returns the array of objects
   */
  filter: (data, constraints) => {
    for (let constraint of constraints) {
      data = data.filter((item) => {
        for (var key in constraint) {
          if (item[key] === undefined || item[key] != constraint[key])
            return false;
        }
        return true;
      });
    }
    return data;
  },
  /**
   * @param {data} is the array of objects to be sorted
   * @param {constraints} is an array of objects containing the sort conditions and sorts in either ascending or descending order
   * @returns a numeric value representing whether a > b or not.
   */
  sortBy: (prop, asc) => {
    if (asc)
      return function (a, b) {
        if (a[prop] > b[prop]) return 1;
        else if (a[prop] < b[prop]) return -1;
        return 0;
      };
    return function (a, b) {
      if (a[prop] < b[prop]) return 1;
      else if (a[prop] > b[prop]) return -1;
      return 0;
    };
  },
  /**
   *
   * @param {data} is the array of objects to be sorted
   * @param {constraints} is an array of objects containing the sort conditions
   * @returns the sorted array of objects
   */
  sort: (data, constraints) => {
    for (let constraint of constraints.reverse()) {
      data = data.sort(
        pageFilterSortUtil.sortBy(constraint.key, constraint.ascending ?? true)
      );
    }
    return data;
  },
  /**
   *
   * @param {data} is the array of objects to be paged
   * @param {constraints} is an array of objects containing the paging conditions
   * @returns
   */
  page: (data, constraints) => {
    const pNo = constraints.pageNo;
    const pSize = constraints.pageSize;
    return data.slice((pNo - 1) * pSize, pNo * pSize);
  },
};

/**
 * The function takes in data and queries, applies filters and sorts to the data based on the queries,
 * and returns the resulting data with a status code.
 * @param data - The data parameter is an array of objects that needs to be filtered and sorted based
 * on the queries provided.
 * @param queries - The `queries` parameter is an object containing key-value pairs where the key
 * represents the type of query to be performed (e.g. "filter", "sort") and the value is a stringified
 * JSON object containing the parameters for that query.
 * @returns an object with a `status` property indicating the status of the operation
 */

const pageFilterSort = (data, queries) => {
  let result = data;
  for (let query in queries) {
    try {
      result = pageFilterSortUtil[query](result, JSON.parse(queries[query]));
    } catch (error) {
      return {
        status: CODES.INTERNAL_SERVER_ERROR,
        data: ERRORS.SYNTAX_ERROR,
        error: error.stack,
      };
    }
  }
  if (result.length === 0)
    return { status: CODES.NOT_FOUND, data: ERRORS.DATA_NOT_FOUND };
  return { status: CODES.OK, data: result };
};

module.exports = pageFilterSort;
