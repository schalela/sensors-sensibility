import getGroupAverages from './getGroupAverages';

describe('getGroupAverages', () => {
  it('should return averages for a collection of raw sensor data records', () => {
    const groupData = [
      { ambient_temperature: 10, humidity: 10, radiation_level: 10, photosensor: 10 },
      { ambient_temperature: 20, humidity: 20, radiation_level: 20, photosensor: 20 },
      { ambient_temperature: 30, humidity: 30, radiation_level: 30, photosensor: 30 }
    ];
    const expectedResult = {
      ambient_temperature: 20,
      humidity: 20,
      radiation_level: 20,
      photosensor: 20
    };

    const result = getGroupAverages(groupData);
    expect(result).toEqual(expectedResult);
  });

  it('should return 0 for an empty collection', () => {
    const groupData = [];
    const expectedResult = {
      ambient_temperature: 0,
      humidity: 0,
      radiation_level: 0,
      photosensor: 0
    };

    const result = getGroupAverages(groupData);
    expect(result).toEqual(expectedResult);
  });
});
