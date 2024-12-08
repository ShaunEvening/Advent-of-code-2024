import { describe, it, expect } from 'vitest';
import { parseInput, buildRulesChecker, buildSortingFunction } from './utils';

import TEST_INPUT, {
  INPUT_AS_RULES_AND_UPDATES,
} from './fixtures/test-data.fixture';

describe('DAY 5:', () => {
  describe('UTILS:', () => {
    describe('UTIL: parseInput', () => {
      it('should parse the input correctly', () => {
        const input = TEST_INPUT;
        const [rules, updates] = parseInput(input);
        expect(rules).toEqual(INPUT_AS_RULES_AND_UPDATES[0]);
        expect(updates).toEqual(INPUT_AS_RULES_AND_UPDATES[1]);
      });
    });

    describe('UTIL: buildRulesChecker', () => {
      const [testRules, testUpdates] = parseInput(TEST_INPUT);

      it('should return a function', () => {
        const rulesChecker = buildRulesChecker(testRules);
        expect(typeof rulesChecker).toBe('function');
      });

      describe('RULES CHECKER:', () => {
        const rulesChecker = buildRulesChecker(testRules);

        it('should return true for a valid update array', () => {
          const [first, second, third] = testUpdates;
          expect(rulesChecker(first)).toBe(true);
          expect(rulesChecker(second)).toBe(true);
          expect(rulesChecker(third)).toBe(true);
        });

        it('should return false for an invalid update array', () => {
          const [first, second, third, fourth, fifth, sixth] = testUpdates;
          expect(rulesChecker(fourth)).toBe(false);
          expect(rulesChecker(fifth)).toBe(false);
          expect(rulesChecker(sixth)).toBe(false);
        });
      });
    });

    describe('UTIL: buildSortingFunction', () => {
      const [testRules, testUpdates] = parseInput(TEST_INPUT);
      it('should return a function', () => {
        const sortingFunction = buildSortingFunction(testRules);
        expect(typeof sortingFunction).toBe('function');
      });

      describe('SORTING FUNCTION:', () => {
        const sortingFunction = buildSortingFunction(testRules);

        it('It should sort the array correctly', () => {
          const [first, second, third, fourth, fifth, sixth] = testUpdates;

          const sortedFirst = first.sort(sortingFunction);
          const sortedSecond = second.sort(sortingFunction);
          const sortedThird = third.sort(sortingFunction);
          const sortedFourth = fourth.sort(sortingFunction);
          const sortedFifth = fifth.sort(sortingFunction);
          const sortedSixth = sixth.sort(sortingFunction);

          expect(sortedFirst).toEqual(first);
          expect(sortedSecond).toEqual(second);
          expect(sortedThird).toEqual(third);
          expect(sortedFourth).toEqual([97, 75, 47, 61, 53]);
          expect(sortedFifth).toEqual([61, 29, 13]);
          expect(sortedSixth).toEqual([97, 75, 47, 29, 13]);
        });
      });
    });
  });
});
