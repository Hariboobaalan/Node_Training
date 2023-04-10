const { ERRORS } = require("../constants/messages.constants");
const CODES = require("../constants/codes.constants");
/**
 * The function takes in data and queries, processes the queries, and returns a status code and the
 * resulting data.
 * @param data - The data parameter is an array of objects that needs to be filtered and sorted based
 * on the queries provided.
 * @param queries - The `queries` parameter is an object containing key-value pairs where the key
 * represents the type of operation to be performed on the data and the value represents the parameters
 * for that operation. The `processor` object is used to map the key to the corresponding function that
 * will perform the operation on the data.
 * @returns The function `pageFilterSort` returns an object with a `status` property and a `data`
 * property. The `status` property indicates the status of the response (e.g. 200 for success, 404 for
 * not found, 500 for server error), and the `data` property contains the result of the filtering and
 * sorting operation. If there is a syntax error during processing,
 */
const processor = {
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
  sort: (data, constraints) => {
    for (let constraint of constraints.reverse()) {
      data = data.sort(
        processor.sortBy(constraint.key, constraint.ascending ?? true)
      );
    }
    return data;
  },
  page: (data, constraints) => {
    const pNo = constraints.pageNo;
    const pSize = constraints.pageSize;
    return data.slice((pNo - 1) * pSize, pNo * pSize);
  },
};

const pageFilterSort = (data, queries) => {
  let result = data;
  for (let query in queries) {
    try {
      result = processor[query](result, JSON.parse(queries[query]));
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
