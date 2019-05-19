export const getGroupAverages = groupData => {
  const calculateAverage = value => groupData.length !== 0 ? value / groupData.length : 0;
  const totalValues = groupData.reduce(addObjects, { ambient_temperature: 0, humidity: 0, radiation_level: 0, photosensor: 0 });

  return Object.keys(totalValues).reduce((acc, key) => {
    acc[key] = calculateAverage(totalValues[key]);
    return acc;
  }, {});
};

export const divideValuesBy = totalRecords => values =>
  Object.keys(values).reduce((acc, key) => {
    acc[key] = values[key] / totalRecords;
    return acc;
  }, {});

export const mergeGroupResults = (groupData, groupIndex, groupsMetadata) => {
  const totals = getGroupAverages(groupData);
  return {
    metadata: groupsMetadata[groupIndex],
    totals
  };
};

export const filterCriteriaForGroup = regex => message => regex.test(message.sensor_uuid);

export const addObjects = (obj1, obj2) => {
  let sum = {};

  Object.keys(obj1).forEach(key => {
    if (obj2.hasOwnProperty(key)) {
      sum[key] = parseFloat(obj1[key]) + parseFloat(obj2[key]);
    }
  });
  return sum;
};
