import addObjects from './addObjects';

export default groupData => {
  const calculateAverage = value => groupData.length !== 0 ? value / groupData.length : 0;
  const totalValues = groupData.reduce(addObjects, { ambient_temperature: 0, humidity: 0, radiation_level: 0, photosensor: 0 });

  return Object.keys(totalValues).reduce((acc, key) => {
    acc[key] = calculateAverage(totalValues[key]);
    return acc;
  }, {});
};
