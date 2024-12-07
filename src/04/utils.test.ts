import { describe, it, expect } from 'vitest';
import {
  parseInputToGrid,
  BuildWordSearchChecker,
  findAllInstancesOfFirstLetter,
  countAllInstancesOfWordFromCoordinates,
  createCrossedWordChecker,
} from './utils';

import TEST_INPUT, { TEST_INPUT_AS_GRID } from './fixtures/test-data.fixture';

describe('DAY 4:', () => {
  describe('UTILS:', () => {
    describe('UTIL: parseInputToGrid', () => {
      it('should return the correct grid', () => {
        const input = TEST_INPUT;
        const result = parseInputToGrid(input);
        const expected = TEST_INPUT_AS_GRID;

        expect(result).toEqual(expected);
      });
    });

    describe('UTIL: BuildWordSearchChecker', () => {
      it('It should return a function', () => {
        const input = TEST_INPUT_AS_GRID;
        const result = BuildWordSearchChecker(input, 'XMAS');

        expect(typeof result).toBe('function');
      });

      describe('UTIL: WordSearchChecker', () => {
        const grid = TEST_INPUT_AS_GRID;
        const wordSearchChecker = BuildWordSearchChecker(grid, 'XMAS');

        it('TRUE: It should return true when a word is found diagonally', () => {
          const result = wordSearchChecker('br', [4, 0]);
          expect(result).toBeTruthy();
        });

        it('TRUE: It should return true when a word is found vertically', () => {
          const result = wordSearchChecker('r', [0, 4]);
          expect(result).toBeTruthy();
        });

        it('TRUE: It should return true when a word is found horizontally', () => {
          const result = wordSearchChecker('b', [9, 3]);
          expect(result).toBeTruthy();
        });

        it('TRUE: It should return true when a word is found backwards', () => {
          const result = wordSearchChecker('l', [6, 4]);
          expect(result).toBeTruthy();
        });

        it('FALSE: It should return false when a word is not found', () => {
          const result = wordSearchChecker('l', [0, 0]);
          expect(result).toBeFalsy();
        });
      });
    });

    describe('UTIL: findAllInstancesOfFirstLetter', () => {
      it('should return the correct number of instances', () => {
        const grid = TEST_INPUT_AS_GRID;
        const result = findAllInstancesOfFirstLetter(grid, 'X');

        expect(result.length).toBe(19);
        expect(result[0]).toEqual([4, 0]);
      });
    });

    describe('UTIL: countAllInstancesOfWordFromCoordinates', () => {
      const grid = TEST_INPUT_AS_GRID;
      const wordSearchChecker = BuildWordSearchChecker(grid, 'XMAS');

      it('should return the correct number of instances', () => {
        const result = countAllInstancesOfWordFromCoordinates(
          wordSearchChecker,
          [5, 9],
        );

        expect(result).toBe(3);
      });
    });

    describe('UTIL: createCrossedWordChecker', () => {
      it('It should return a function', () => {
        const input = TEST_INPUT_AS_GRID;
        const result = createCrossedWordChecker(input, 'MAS');

        expect(typeof result).toBe('function');
      });

      describe('UTIL: WordSearchChecker', () => {
        const grid = TEST_INPUT_AS_GRID;
        const wordSearchChecker = createCrossedWordChecker(grid, 'MAS');

        it('TRUE: It should return true when a cross is found', () => {
          const result = wordSearchChecker([2, 1]);
          expect(result).toBeTruthy();
        });

        it("FALSE: It should return false when a cross isn't found", () => {
          const result = wordSearchChecker([7, 0]);
          expect(result).toBeFalsy();
        });
      });
    });
  });
});
