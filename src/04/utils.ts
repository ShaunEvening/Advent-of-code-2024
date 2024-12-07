type WordSearchGrid = string[][];

export const parseInputToGrid = (input: string): WordSearchGrid =>
  input.split('\n').map((row) => row.split(''));

const GRID_DIRECTIONS = ['tl', 't', 'tr', 'r', 'br', 'b', 'bl', 'l'] as const;

type GridDirection = (typeof GRID_DIRECTIONS)[number];
type GridCoordinate = [x: number, y: number];
type CoordinateTranslation = [
  transformX: (x: number, index: number) => number,
  transformY: (y: number, index: number) => number,
];

const directionTranslationFunctions: Record<
  GridDirection,
  CoordinateTranslation
> = {
  tl: [(x, index) => x - index, (y, index) => y - index],
  t: [(x, index) => x, (y, index) => y - index],
  tr: [(x, index) => x + index, (y, index) => y - index],
  r: [(x, index) => x + index, (y, index) => y],
  br: [(x, index) => x + index, (y, index) => y + index],
  b: [(x, index) => x, (y, index) => y + index],
  bl: [(x, index) => x - index, (y, index) => y + index],
  l: [(x, index) => x - index, (y, index) => y],
};

const buildBoundsCheck =
  (lowerBound: number, upperBound: number) => (num: number) =>
    num >= lowerBound && num <= upperBound;

export const BuildWordSearchChecker =
  (grid: WordSearchGrid, word: string) =>
  (directionForWord: GridDirection, startingCoordinate: GridCoordinate) => {
    const [startingX, startingY] = startingCoordinate;
    const [transformX, transformY] =
      directionTranslationFunctions[directionForWord];

    const checkXBounds = buildBoundsCheck(0, grid[0].length - 1);
    const checkYBounds = buildBoundsCheck(0, grid.length - 1);

    const wordCharacters = word.split('');

    return wordCharacters.every((character, index) => {
      const [x, y] = [
        transformX(startingX, index),
        transformY(startingY, index),
      ];

      if (!checkXBounds(x) || !checkYBounds(y)) {
        return false;
      }

      const gridCharacter = grid[y][x];

      return gridCharacter.toUpperCase() === character.toUpperCase();
    });
  };

export const findAllInstancesOfFirstLetter = (
  grid: WordSearchGrid,
  letter: string,
): GridCoordinate[] => {
  const coordinates: GridCoordinate[] = [];

  grid.forEach((row, y) => {
    row.forEach((character, x) => {
      if (character.toUpperCase() === letter.toUpperCase()) {
        coordinates.push([x, y]);
      }
    });
  });

  return coordinates;
};

export const countAllInstancesOfWordFromCoordinates = (
  wordSearchChecker: ReturnType<typeof BuildWordSearchChecker>,
  startingCoordinate: GridCoordinate,
) =>
  GRID_DIRECTIONS.reduce(
    (count, direction) =>
      wordSearchChecker(direction, startingCoordinate) ? count + 1 : count,
    0,
  );

export const createCrossedWordChecker =
  (grid: WordSearchGrid, crossedWord: string) =>
  (coordinate: GridCoordinate) => {
    const wordForward = crossedWord.toUpperCase();
    const wordBackwards = crossedWord
      .split('')
      .reverse()
      .join('')
      .toUpperCase();

    const [startingX, startingY] = coordinate;
    const anchorLetter = grid[startingY][startingX];
    const topLeftLeter = grid[startingY - 1]?.[startingX - 1];
    const topRightLetter = grid[startingY - 1]?.[startingX + 1];
    const bottomLeftLetter = grid[startingY + 1]?.[startingX - 1];
    const bottomRightLetter = grid[startingY + 1]?.[startingX + 1];

    if (
      !topLeftLeter ||
      !topRightLetter ||
      !bottomLeftLetter ||
      !bottomRightLetter
    ) {
      return false;
    }

    const lineOne =
      `${topLeftLeter}${anchorLetter}${bottomRightLetter}`.toUpperCase();
    const lineTwo =
      `${topRightLetter}${anchorLetter}${bottomLeftLetter}`.toUpperCase();

    return (
      (lineOne === wordForward || lineOne === wordBackwards) &&
      (lineTwo === wordForward || lineTwo === wordBackwards)
    );
  };
