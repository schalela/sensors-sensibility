import divideObjectValuesBy from './divideObjectValuesBy';

describe('divideObjectValuesBy', () => {
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

    const result = divideObjectValuesBy(numOfRecords)(groupTotals);
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

    const result = divideObjectValuesBy(numOfRecords)(groupTotals);
    expect(result).toEqual(expectedResult);
  });
});
