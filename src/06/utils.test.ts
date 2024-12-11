import { describe, it, expect } from 'vitest';
import {
  parseInputToGrid,
  positionHasGuard,
  positionIsBlocked,
  positionIsOpen,
  turn90Degrees,
  nextCoordinate,
  findGuardsPosition,
  mapGuardCharToDirection,
  determineGuardsPath,
  getUniquieVisitedPositions,
  HistoricalPosition,
  determineLoopPossibilities,
  getAllObstacles,
} from './utils';

import TEST_INPUT, {
  GUARD_PATH_ON_GRID,
  INPUT_AS_GRID,
  OBSTACLE_COORDINATES,
} from './fixtures/test-data.fixture';

describe('DAY 6:', () => {
  describe('UTILS:', () => {
    describe('UTIL: parseInputToGrid', () => {
      it('should parse the input correctly', () => {
        const input = TEST_INPUT;
        const grid = parseInputToGrid(input);

        expect(grid).toEqual(INPUT_AS_GRID);
      });
    });

    describe('UTIL: positionIsOpen', () => {
      it('should return true for an open position', () => {
        expect(positionIsOpen('.')).toBe(true);
      });

      it('should return false for a blocked position', () => {
        expect(positionIsOpen('#')).toBe(false);
        expect(positionIsOpen('^')).toBe(false);
      });
    });

    describe('UTIL: positionIsBlocked', () => {
      it('should return true for a blocked position', () => {
        expect(positionIsBlocked('#')).toBe(true);
      });

      it('should return false for an open position', () => {
        expect(positionIsBlocked('.')).toBe(false);
        expect(positionIsBlocked('^')).toBe(false);
      });
    });

    describe('UTIL: positionHasGuard', () => {
      it('should return true for a guard position', () => {
        expect(positionHasGuard('^')).toBe(true);
      });

      it('should return false for an open position', () => {
        expect(positionHasGuard('.')).toBe(false);
        expect(positionHasGuard('#')).toBe(false);
      });
    });

    describe('UTIL: turn90Degrees', () => {
      it('should turn 90 degrees clockwise', () => {
        expect(turn90Degrees('N')).toBe('E');
        expect(turn90Degrees('E')).toBe('S');
        expect(turn90Degrees('S')).toBe('W');
        expect(turn90Degrees('W')).toBe('N');
      });
    });

    describe('UTIL: nextCoordinate', () => {
      it('should return the next coordinate', () => {
        expect(nextCoordinate([0, 0], 'N')).toEqual([0, -1]);
        expect(nextCoordinate([0, 0], 'E')).toEqual([1, 0]);
        expect(nextCoordinate([0, 0], 'S')).toEqual([0, 1]);
        expect(nextCoordinate([0, 0], 'W')).toEqual([-1, 0]);
      });
    });

    describe('UTIL: findGuardsPosition', () => {
      it('It should return the position of the guard', () => {
        const grid = INPUT_AS_GRID;
        const expected = [4, 6];
        const result = findGuardsPosition(grid);

        expect(result).toEqual(expected);
      });
    });

    describe('UTIL: mapGuardCharToDirection', () => {
      it('It should map the guard character to a direction', () => {
        expect(mapGuardCharToDirection('^')).toBe('N');
        expect(mapGuardCharToDirection('>')).toBe('E');
        expect(mapGuardCharToDirection('v')).toBe('S');
        expect(mapGuardCharToDirection('<')).toBe('W');
      });
    });

    describe('UTIL: determineGuardsPath', () => {
      it('It should return the path the guard takes', () => {
        const grid = INPUT_AS_GRID;
        const startingPosition = findGuardsPosition(grid);

        const result = determineGuardsPath(grid, startingPosition);

        expect(result).toEqual(GUARD_PATH_ON_GRID);
      });
    });

    describe('UTIL: getUniquieVisitedPositions', () => {
      it('It should return the unique visited positions', () => {
        const path = GUARD_PATH_ON_GRID as HistoricalPosition[];
        const result = getUniquieVisitedPositions(path);

        expect(result).toHaveLength(41);
      });
    });

    describe('UTIL: getAllObstacles', () => {
      it('It should return the obstacles on the grid', () => {
        const grid = INPUT_AS_GRID;
        const result = getAllObstacles(grid);

        expect(result).toEqual(OBSTACLE_COORDINATES);
      });
    });
  });

  describe('UTIL: determineLoopPossibilities', () => {
    it('It should return the possible loop creating Obstacles', () => {
      const grid = INPUT_AS_GRID;
      const path = GUARD_PATH_ON_GRID as HistoricalPosition[];
      const result = determineLoopPossibilities(grid, path);
      const expected = [
        [3, 6],
        [6, 7],
        [3, 8],
        [1, 8],
        [7, 7],
        [7, 9],
      ];

      expect(result).toEqual(expected);
    });
  });
});
