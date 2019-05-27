export default totalRecords => values => totalRecords > 0
  ? Object.keys(values).reduce((acc, key) => {
    acc[key] = values[key] / totalRecords;
    return acc;
  }, {}) : {};
