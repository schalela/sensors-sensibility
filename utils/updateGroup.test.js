import { from } from 'rxjs';
import updateGroup from './updateGroup';

describe('updateGroup', () => {
  let addRecord;
  let groupsMetadata;
  let resultArray;

  beforeEach(() => {
    resultArray = [[], []];

    groupsMetadata = [
      {
        name: 'Group Bananas',
        position: { lat: 1, lng: 2 },
        regex: /probe-0/g
      },
      {
        name: 'Group Foo',
        position: { lat: 3, lng: 4 },
        regex: /probe-1/g
      }
    ];

    addRecord = groupIndex => record => resultArray[groupIndex].push(record);
  });

  it('should update only the subscribed group', () => {
    const streamArray = [
      { sensor_uuid: 'probe-0', foo: 'bar' },
      { sensor_uuid: 'probe-1', bar: 'foo' }
    ];
    from(streamArray).subscribe(updateGroup(groupsMetadata, 0, addRecord));

    const expectedResult = [
      [
        { sensor_uuid: 'probe-0', foo: 'bar' }
      ],
      []
    ];

    expect(resultArray).toEqual(expectedResult);
  });

  it('should update multiple subscribed groups', () => {
    const streamArray = [
      { sensor_uuid: 'probe-0', foo: 'bar' },
      { sensor_uuid: 'probe-1', bar: 'foo' },
      { sensor_uuid: 'probe-0', foo: 'bananas' }
    ];
    from(streamArray).subscribe(updateGroup(groupsMetadata, 0, addRecord));
    from(streamArray).subscribe(updateGroup(groupsMetadata, 1, addRecord));

    const expectedResult = [
      [
        { sensor_uuid: 'probe-0', foo: 'bar' },
        { sensor_uuid: 'probe-0', foo: 'bananas' }
      ],
      [
        { sensor_uuid: 'probe-1', bar: 'foo' }
      ]
    ];

    expect(resultArray).toEqual(expectedResult);
  });
});
