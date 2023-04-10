const { ERRORS } = require("../constants/messages.constants");
const CODES = require("../constants/codes.constants");

// Utility Helper Function to perform Paging, Filtering, Sorting
const pageFilterSortUtil = {
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
        pageFilterSortUtil.sortBy(constraint.key, constraint.ascending ?? true)
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
// Utility Function to perform Paging, Filtering, Sorting with the help of Helper Function
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
