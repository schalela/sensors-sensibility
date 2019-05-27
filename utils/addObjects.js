export default (obj1, obj2) => {
  let sum = {};

  Object.keys(obj1).forEach(key => {
    if (obj2.hasOwnProperty(key)) {
      sum[key] = parseFloat(obj1[key]) + parseFloat(obj2[key]);
    }
  });

  return sum;
};
