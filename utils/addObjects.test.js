import addObjects from './addObjects';

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
