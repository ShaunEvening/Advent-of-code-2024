import {
  Grid,
  Coordinate,
  createGridBoundChecker,
  createCoordinateKey,
} from '@common/utils/grid.utils';

export const parseInputToGrid = (input: string): Grid<string> =>
  input.split('\n').map((row) => row.split(''));

const OPEN_POSITION_CHAR = '.';
const OBSTACLE_CHAR = '#';
const GUARD_FACING_NORTH = '^';
const GUARD_FACING_EAST = '>';
const GUARD_FACING_SOUTH = 'v';
const GUARD_FACING_WEST = '<';

const GRID_DIRECTIONS = ['N', 'E', 'S', 'W'] as const;
const GUARD_CHARS = [
  GUARD_FACING_NORTH,
  GUARD_FACING_EAST,
  GUARD_FACING_SOUTH,
  GUARD_FACING_WEST,
] as const;

export type GridDirection = (typeof GRID_DIRECTIONS)[number];
export type GuardChar = (typeof GUARD_CHARS)[number];

/**
 *
 * @param positionChar the character at the position in the grid
 * @returns if the position in the given grid is open
 */
export const positionIsOpen = (positionChar: string) =>
  positionChar === OPEN_POSITION_CHAR;

/**
 *
 * @param positionChar the character at the position in the grid
 * @returns if the position in the given grid has a guard
 */
export const positionHasGuard = (
  positionChar: string,
): positionChar is GuardChar =>
  positionChar === GUARD_FACING_NORTH ||
  positionChar === GUARD_FACING_EAST ||
  positionChar === GUARD_FACING_SOUTH ||
  positionChar === GUARD_FACING_WEST;

/**
 *
 * @param positionChar the character at the position in the grid
 * @returns if the position in the given grid is blocked
 */
export const positionIsBlocked = (positionChar: string) =>
  positionChar === OBSTACLE_CHAR;

export const getAllObstacles = (grid: Grid<string>) => {
  return grid.reduce((acc, row, y) => {
    return [
      ...acc,
      ...row.reduce((acc, char, x) => {
        if (positionIsBlocked(char)) {
          const coordinate = [x, y] as Coordinate;
          return [...acc, coordinate];
        }

        return acc;
      }, [] as Coordinate[]),
    ];
  }, [] as Coordinate[]);
};

export const mapGuardCharToDirection = (guard: GuardChar): GridDirection => {
  const index = GUARD_CHARS.indexOf(guard);
  return GRID_DIRECTIONS[index];
};

export const mapDirectionToGuardChar = (
  direction: GridDirection,
): GuardChar => {
  const index = GRID_DIRECTIONS.indexOf(direction);
  return GUARD_CHARS[index];
};

export const turn90Degrees = (facing: GridDirection): GridDirection => {
  const index = GRID_DIRECTIONS.indexOf(facing);
  const nextIndex = (index + 1) % GRID_DIRECTIONS.length;
  return GRID_DIRECTIONS[nextIndex];
};

export const nextCoordinate = (
  [x, y]: Coordinate,
  direction: GridDirection,
): Coordinate => {
  switch (direction) {
    case 'N':
      return [x, y - 1];
    case 'E':
      return [x + 1, y];
    case 'S':
      return [x, y + 1];
    case 'W':
      return [x - 1, y];
  }
};

export const findGuardsPosition = (grid: Grid<string>): Coordinate => {
  const yIndex = grid.findIndex((row) => row.some(positionHasGuard));
  const xIndex = grid[yIndex].findIndex(positionHasGuard);
  return [xIndex, yIndex];
};

export const pluckFromGrid = (grid: Grid<string>, [x, y]: Coordinate) =>
  grid[y][x];

export interface GuardState {
  grid: Grid<string>;
  guardPosition: Coordinate;
  guardDirection: GridDirection;
}

export const determineNextAction = ({
  grid,
  guardPosition,
  guardDirection,
}: GuardState) => {
  const nextPosition = nextCoordinate(guardPosition, guardDirection);
  const nextPositionChar = pluckFromGrid(grid, nextPosition);

  if (positionIsBlocked(nextPositionChar)) {
    return 'turn';
  }

  return 'move';
};

export interface HistoricalPosition {
  position: Coordinate;
  direction: GridDirection;
}

export const determineGuardsPath = (
  grid: Grid<string>,
  startingPosition: Coordinate,
): HistoricalPosition[] => {
  const initialGuardDirection = mapGuardCharToDirection(
    grid[startingPosition[1]][startingPosition[0]] as GuardChar,
  );

  const state = {
    grid: grid,
    guardPosition: startingPosition,
    guardDirection: initialGuardDirection,
    historicalPositions: [] as HistoricalPosition[],
  };

  // Add the initial guard position to the set of visited positions
  state.historicalPositions.push({
    position: state.guardPosition,
    direction: state.guardDirection,
  });

  const guardIsInBounds = createGridBoundChecker(state.grid);

  while (
    guardIsInBounds(nextCoordinate(state.guardPosition, state.guardDirection))
  ) {
    const nextMove = determineNextAction(state);

    if (nextMove === 'move') {
      const newPosition = nextCoordinate(
        state.guardPosition,
        state.guardDirection,
      );
      state.guardPosition = newPosition;
      state.historicalPositions.push({
        position: state.guardPosition,
        direction: state.guardDirection,
      });
    }

    if (nextMove === 'turn') {
      state.guardDirection = turn90Degrees(state.guardDirection);
    }
  }

  return state.historicalPositions;
};

export const getUniquieVisitedPositions = (positions: HistoricalPosition[]) => {
  const visitedPositions = new Set<string>();

  return positions.filter(({ position }) => {
    const key = createCoordinateKey(position);
    if (visitedPositions.has(key)) {
      return false;
    }

    visitedPositions.add(key);
    return true;
  });
};

export const coordinatesMatch = ([ax, ay]: Coordinate, [bx, by]: Coordinate) =>
  ax === bx && ay === by;

const copyGrid = (grid: Grid<string>) => grid.map((row) => [...row]);

export const determineLoopPossibilities = (
  grid: Grid<string>,
  path: HistoricalPosition[],
) => {
  const isInBounds = createGridBoundChecker(grid);
  const [initialGuardPosition, ...rest] = path;
  const loopingObstacles = new Set<string>();

  const uniqueVisitedPositions = getUniquieVisitedPositions(path).filter(
    (p) => !coordinatesMatch(p.position, initialGuardPosition.position),
  );

  uniqueVisitedPositions.forEach((currentPosition, index) => {
    const newGrid = copyGrid(grid);
    newGrid[currentPosition.position[1]][currentPosition.position[0]] =
      OBSTACLE_CHAR;

    const state = {
      grid: newGrid,
      guardPosition: initialGuardPosition.position,
      guardDirection: initialGuardPosition.direction,
      historicalPositions: [initialGuardPosition] as HistoricalPosition[],
    };

    let reenteredPath = false;

    while (
      isInBounds(nextCoordinate(state.guardPosition, state.guardDirection)) &&
      !reenteredPath &&
      !coordinatesMatch(initialGuardPosition.position, currentPosition.position)
    ) {
      const nextMove = determineNextAction(state);

      if (nextMove === 'move') {
        const newPosition = nextCoordinate(
          state.guardPosition,
          state.guardDirection,
        );
        state.guardPosition = newPosition;

        const hasBeenHereBefore = state.historicalPositions.some(
          ({ position, direction }) =>
            coordinatesMatch(position, state.guardPosition) &&
            direction === state.guardDirection,
        );

        if (hasBeenHereBefore) {
          reenteredPath = true;
        } else {
          state.historicalPositions.push({
            position: state.guardPosition,
            direction: state.guardDirection,
          });
        }
      }

      if (nextMove === 'turn') {
        state.guardDirection = turn90Degrees(state.guardDirection);
      }
    }

    if (reenteredPath) {
      loopingObstacles.add(createCoordinateKey(currentPosition.position));
    }
  });

  return [...loopingObstacles].map((key) => key.split(',').map(Number));
};
