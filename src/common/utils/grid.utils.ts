export type Coordinate = [x: number, y: number];
export type Grid<T> = T[][];
export const GRID_CARDINAL_DIRECTIONS = [
  'N',
  'NE',
  'E',
  'SE',
  'S',
  'SW',
  'W',
  'NW',
] as const;

export type GridCardinalDirection = (typeof GRID_CARDINAL_DIRECTIONS)[number];

const createBoundChecker =
  (lowerBound: number, upperBound: number) => (value: number) =>
    value >= lowerBound && value < upperBound;

export const createGridBoundChecker = (grid: Grid<unknown>) => {
  const checkX = createBoundChecker(0, grid[0].length);
  const checkY = createBoundChecker(0, grid.length);

  return ([x, y]: Coordinate) => checkX(x) && checkY(y);
};

export const createCoordinateKey = ([x, y]: Coordinate) => `${x},${y}`;
export const parseCoordinateKey = (key: string): Coordinate => {
  const [x, y] = key.split(',');
  return [Number(x), Number(y)];
};

export const getListOfAllCoordinates = (grid: Grid<unknown>) =>
  grid.reduce((acc: string[], row, y) => {
    const rowCoords = row.map((_, x) => createCoordinateKey([x, y]));
    return [...acc, ...rowCoords];
  }, [] as string[]);
