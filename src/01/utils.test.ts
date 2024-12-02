import { describe, expect, it } from 'vitest';
import {
  buildListsFromInput,
  sortListAscending,
  computeDistanceBetweenLists,
  countOccurrencesInArray,
  computeTotalSimilarityScore,
} from './utils';

import TEST_DATA from './fixtures/test-ids';

describe('DAY 01:', () => {
  describe('UTILS:', () => {
    describe('UTIL: buildListsFromInput', () => {
      it('should return the correct lists', () => {
        const input = TEST_DATA;
        const expected = {
          a: [3, 4, 2, 1, 3, 3],
          b: [4, 3, 5, 3, 9, 3],
        };

        const result = buildListsFromInput(input);

        expect(result).toEqual(expected);
      });
    });
    describe('UTIL: sortListAscending', () => {
      it('should sort the list in ascending order', () => {
        const list = [3, 4, 2, 1, 3, 3];
        const expected = [1, 2, 3, 3, 3, 4];

        const result = sortListAscending(list);

        expect(result).toEqual(expected);
      });
    });
    describe('UTIL: computeDistanceBetweenLists', () => {
      it('should return the correct distance', () => {
        const a = [1, 2, 3, 3, 3, 4];
        const b = [3, 3, 3, 4, 5, 9];
        const expected = 11;

        const result = computeDistanceBetweenLists(a, b);

        expect(result).toBe(expected);
      });
    });
    describe('UTIL: countOccurrencesInArray', () => {
      it('should return the correct number of occurances', () => {
        const value = 3;
        const list = [3, 3, 3, 4, 5, 9];
        const expected = 3;

        const result = countOccurrencesInArray(value, list);

        expect(result).toBe(expected);
      });
    });
    describe('UTIL: computeTotalSimilarityScore', () => {
      it('should return the correct simularity score', () => {
        const a = [1, 2, 3, 3, 3, 4];
        const b = [3, 3, 3, 4, 5, 9];
        const expected = 31;

        const result = computeTotalSimilarityScore(a, b);

        expect(result).toBe(expected);
      });
    });
  });
});
