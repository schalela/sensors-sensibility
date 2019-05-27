import mergeGroupResults from './mergeGroupResults';

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
