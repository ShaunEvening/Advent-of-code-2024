import PART_ONE_INPUT from './input';

// The space between the numbers in the inputs
const DELIMITER = '   ';

type Lists = {
  a: number[];
  b: number[];
};
export const buildListsFromInput = (input: string) => {
  const list = input.split('\n');
  return list.reduce(
    (lists, row) => {
      const [a, b] = row.split(DELIMITER);
      lists.a.push(Number(a));
      lists.b.push(Number(b));
      return lists;
    },
    { a: [], b: [] } as Lists,
  );
};

export const sortListAscending = (list: number[]) => list.sort((a, b) => a - b);

export const computeDistanceBetweenLists = (a: number[], b: number[]) =>
  a.reduce((acc, val, i) => acc + Math.abs(val - b[i]), 0);

/**
 * @param value value to search for in given list
 * @param list assume the list is sorted in ascending order
 * @returns number of occurrences of value in list
 */
export const countOccurrencesInArray = (value: number, list: number[]) => {
  const firstIndex = list.findIndex((val) => val === value);
  const lastIndex = list.lastIndexOf(value);

  return lastIndex - firstIndex + 1;
};

export const computeTotalSimilarityScore = (a: number[], b: number[]) =>
  a.reduce((acc, val) => {
    if (!b.includes(val)) {
      return acc;
    }

    const occurencesInB = countOccurrencesInArray(val, b);

    return acc + val * occurencesInB;
  }, 0);
