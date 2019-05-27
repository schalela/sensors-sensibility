import filterUsingRegex from './filterUsingRegex';

describe('filterUsingRegex', () => {
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
