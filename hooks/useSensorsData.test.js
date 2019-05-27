import { renderHook, act } from 'react-hooks-testing-library';
import useSensorsData from './useSensorsData';

class MockedPubSub {
  constructor() {
    this.listeners = null;
  }

  init = (listener) => {
    this.listeners = listener;
  }

  subscribe = () => { }
};

const streamNewMessage = (message, stream) => {
  act(() => {
    stream.listeners.message({ message });
  });
}

describe('useSensorsData', () => {
  let mockedStream;

  beforeEach(() => {
    mockedStream = new MockedPubSub();
  });

  describe('no groups', () => {
    it('should return a an empty string as results when there are no groups', () => {
      const { result } = renderHook(() => useSensorsData([], mockedStream));
      const [results] = result.current;
      expect(results).toEqual([]);
    });

    it('should return an empty object for averages when there are no groups', () => {
      const { result } = renderHook(() => useSensorsData([], mockedStream));
      const [_, averages] = result.current;
      expect(averages).toEqual({});
    });
  })

  describe('no messages', () => {
    it('should return empty results when there are groups but no messages', () => {
      const testGroups = [
        {
          name: 'Foo',
          regex: /foo/g
        },
        {
          name: 'Bar',
          regex: /bar/g
        },
      ];

      const expectedResults = [
        {
          metadata: {
            name: 'Foo',
            regex: /foo/g
          },
          totals: {
            ambient_temperature: 0,
            humidity: 0,
            radiation_level: 0,
            photosensor: 0
          }
        },
        {
          metadata: {
            name: 'Bar',
            regex: /bar/g
          },
          totals: {
            ambient_temperature: 0,
            humidity: 0,
            radiation_level: 0,
            photosensor: 0
          }
        }
      ];

      const expectedAverages = {
        ambient_temperature: 0,
        humidity: 0,
        radiation_level: 0,
        photosensor: 0
      };

      const { result } = renderHook(() => useSensorsData(testGroups, mockedStream));
      const [results, averages] = result.current;
      expect(results).toEqual(expectedResults);
      expect(averages).toEqual(expectedAverages)
    });
  })


  describe('with messages', () => {
    const testGroups = [
      {
        name: 'Foo',
        regex: /foo/g
      },
      {
        name: 'Bar',
        regex: /bar/g
      },
    ];

    it('should filter and add a new mesage and return rolling average', () => {
      const expectedResults = [
        {
          metadata: {
            name: 'Foo',
            regex: /foo/g
          },
          totals: {
            ambient_temperature: 21.5,
            humidity: 78.25,
            radiation_level: 312.5,
            photosensor: 737.5
          }
        },
        {
          metadata: {
            name: 'Bar',
            regex: /bar/g
          },
          totals: {
            ambient_temperature: 31.75,
            humidity: 78.75,
            radiation_level: 255,
            photosensor: 732.5
          }
        }
      ];

      const expectedAverages = {
        ambient_temperature: 26.625,
        humidity: 78.5,
        radiation_level: 283.75,
        photosensor: 735
      };

      const { result } = renderHook(() => useSensorsData(testGroups, mockedStream));

      streamNewMessage({ sensor_uuid: 'foo-affa', ambient_temperature: 23, humidity: 80, radiation_level: 300, photosensor: 800 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'bar-ffds', ambient_temperature: 33, humidity: 70, radiation_level: 400, photosensor: 780 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'foo-cdsa', ambient_temperature: 22, humidity: 79, radiation_level: 350, photosensor: 750 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'bar-zxdd', ambient_temperature: 30, humidity: 82, radiation_level: 200, photosensor: 900 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'foo-c4ce', ambient_temperature: 20, humidity: 76, radiation_level: 400, photosensor: 800 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'bar-zdas', ambient_temperature: 35, humidity: 83, radiation_level: 300, photosensor: 750 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'foo-vrrc', ambient_temperature: 21, humidity: 78, radiation_level: 200, photosensor: 600 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'bar-asdr', ambient_temperature: 29, humidity: 80, radiation_level: 120, photosensor: 500 }, mockedStream);

      const [results, averages] = result.current;
      expect(results).toEqual(expectedResults);
      expect(averages).toEqual(expectedAverages);
    });

    it('should calculate average only for the window values', () => {
      const expectedResults = [
        {
          metadata: {
            name: 'Foo',
            regex: /foo/g
          },
          totals: {
            ambient_temperature: 25,
            humidity: 65,
            radiation_level: 300,
            photosensor: 175
          }
        },
        {
          metadata: {
            name: 'Bar',
            regex: /bar/g
          },
          totals: {
            ambient_temperature: 27.5,
            humidity: 75,
            radiation_level: 210,
            photosensor: 425
          }
        }
      ];

      const expectedAverages = {
        ambient_temperature: 26.25,
        humidity: 70,
        radiation_level: 255,
        photosensor: 300
      };

      const rollingWindow = 2;

      const { result, unmount } = renderHook(() => useSensorsData(testGroups, mockedStream, rollingWindow));

      streamNewMessage({ sensor_uuid: 'foo', ambient_temperature: 100, humidity: 100, radiation_level: 100, photosensor: 100 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'bar', ambient_temperature: 100, humidity: 100, radiation_level: 100, photosensor: 100 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'foo', ambient_temperature: 100, humidity: 100, radiation_level: 100, photosensor: 100 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'bar', ambient_temperature: 100, humidity: 100, radiation_level: 100, photosensor: 100 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'foo', ambient_temperature: 20, humidity: 60, radiation_level: 400, photosensor: 150 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'bar', ambient_temperature: 35, humidity: 70, radiation_level: 300, photosensor: 400 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'foo', ambient_temperature: 30, humidity: 70, radiation_level: 200, photosensor: 200 }, mockedStream);
      streamNewMessage({ sensor_uuid: 'bar', ambient_temperature: 20, humidity: 80, radiation_level: 120, photosensor: 450 }, mockedStream);

      const [results, averages] = result.current;
      expect(results).toEqual(expectedResults);
      expect(averages).toEqual(expectedAverages);
      unmount();
    });

    it('should filter a new mesage and return valid results', () => {
      const expectedResults = [
        {
          metadata: {
            name: 'Foo',
            regex: /foo/g
          },
          totals: {
            ambient_temperature: 10,
            humidity: 10,
            radiation_level: 10,
            photosensor: 10
          }
        },
        {
          metadata: {
            name: 'Bar',
            regex: /bar/g
          },
          totals: {
            ambient_temperature: 0,
            humidity: 0,
            radiation_level: 0,
            photosensor: 0
          }
        }
      ];

      const expectedAverages = {
        ambient_temperature: 5,
        humidity: 5,
        radiation_level: 5,
        photosensor: 5
      };

      const { result } = renderHook(() => useSensorsData(testGroups, mockedStream));

      streamNewMessage({ sensor_uuid: 'foo-abcd', ambient_temperature: 10, humidity: 10, radiation_level: 10, photosensor: 10 }, mockedStream);

      const [results, averages] = result.current;
      expect(results).toEqual(expectedResults);
      expect(averages).toEqual(expectedAverages);
    });
  })

});
