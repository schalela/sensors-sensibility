import { getGroupAverages, divideValuesBy, mergeGroupResults, filterUsingRegex, addObjects } from './helpers';

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

describe('divideValuesBy', () => {
  it('should divide the values in a totals object for a given number of records', () => {
    const numOfRecords = 10;
    const groupTotals = {
      foo: 100,
      bar: 500,
      bananas: 1000
    };

    const expectedResult = {
      foo: 10,
      bar: 50,
      bananas: 100
    };

    const result = divideValuesBy(numOfRecords)(groupTotals);
    expect(result).toEqual(expectedResult);
  });

  it('should return an empty object if the number of records is 0', () => {
    const numOfRecords = 0;
    const groupTotals = {
      foo: 100,
      bar: 500,
      bananas: 1000
    };

    const expectedResult = {};

    const result = divideValuesBy(numOfRecords)(groupTotals);
    expect(result).toEqual(expectedResult);
  });
});

describe('buildGroupResults', () => {
  it('should merge the averages with the groups metadata for the correspondent group', () => {
    const groupData1 = [
      { ambient_temperature: 10, humidity: 10, radiation_level: 10, photosensor: 10 },
      { ambient_temperature: 20, humidity: 20, radiation_level: 20, photosensor: 20 },
      { ambient_temperature: 30, humidity: 30, radiation_level: 30, photosensor: 30 }
    ];

    const groupData2 = [
      { ambient_temperature: 40, humidity: 10, radiation_level: 10, photosensor: 10 },
      { ambient_temperature: 30, humidity: 20, radiation_level: 20, photosensor: 20 },
      { ambient_temperature: 30, humidity: 30, radiation_level: 30, photosensor: 30 },
      { ambient_temperature: 20, humidity: 30, radiation_level: 30, photosensor: 30 }
    ];

    const groupsMetadata = [
      {
        name: 'Group Bananas',
        position: { lat: 1, lng: 2 }
      },
      {
        name: 'Group Foo',
        position: { lat: 3, lng: 4 }
      }
    ];

    expect(mergeGroupResults(groupData1, 0, groupsMetadata)).toEqual({
      metadata: {
        name: 'Group Bananas',
        position: { lat: 1, lng: 2 }
      },
      totals: {
        ambient_temperature: 20,
        humidity: 20,
        photosensor: 20,
        radiation_level: 20
      }
    });
    expect(mergeGroupResults(groupData2, 1, groupsMetadata)).toEqual({
      metadata: {
        name: 'Group Foo',
        position: { lat: 3, lng: 4 }
      },
      totals: {
        ambient_temperature: 30,
        humidity: 22.5,
        photosensor: 22.5,
        radiation_level: 22.5
      }
    });
  });
});

describe('filterCriteriaForGroup', () => {
  const groupsMetadata = [
    {
      name: 'Group Bananas',
      position: { lat: 1, lng: 2 },
      regex: /probe-0/g
    },
    {
      name: 'Group Foo',
      position: { lat: 3, lng: 4 },
      regex: /probe-([a-z,A-Z])\w+/g
    }
  ];

  it('should return true if the message sensor_uuid matches the group regex for a numeric group', () => {
    const message = { sensor_uuid: 'probe-0FOO' };

    const result = filterUsingRegex(groupsMetadata[0].regex)(message);
    expect(result).toBe(true);
  });

  it('should return true if the message sensor_uuid matches the group regex for a non-numeric group prefix', () => {
    const message = { sensor_uuid: 'probe-kBAR' };

    const result = filterUsingRegex(groupsMetadata[1].regex)(message);
    expect(result).toBe(true);
  });

  it('should return false if the message sensor_uuid does not match the group regex for a numeric group prefix', () => {
    const message = { sensor_uuid: 'probe-kBAR' };

    const result = filterUsingRegex(groupsMetadata[0].regex)(message);
    expect(result).toBe(false);
  });

  it('should return false if the message sensor_uuid does not match the group regex for a non-numeric group prefix', () => {
    const message = { sensor_uuid: 'probe-0FOO' };

    const result = filterUsingRegex(groupsMetadata[1].regex)(message);
    expect(result).toBe(false);
  });
});

describe('addObjects', () => {
  it('should add the values of the same properties of an object', () => {
    const obj1 = {
      foo: 3,
      bar: 8
    };

    const obj2 = {
      foo: 5,
      bar: 2
    };

    const result = addObjects(obj1, obj2);
    expect(result).toEqual({ foo: 8, bar: 10 });
  });

  it('should add the values of the same properties of an object if the values are number strings', () => {
    const obj1 = {
      foo: '3',
      bar: 8
    };

    const obj2 = {
      foo: 5,
      bar: '2'
    };

    const result = addObjects(obj1, obj2);
    expect(result).toEqual({ foo: 8, bar: 10 });
  });

  it('should add only the values of the same properties of an object if the properties are different', () => {
    const obj1 = {
      foo: '3',
      bar: 8
    };

    const obj2 = {
      foo: 5,
      zoo: '2'
    };

    const result = addObjects(obj1, obj2);
    expect(result).toEqual({ foo: 8 });
  });
});
