import chalk from 'chalk';
import { Logger } from '@common/utils/console.utils';

import GRID_STRING from './input';
import {
  BuildWordSearchChecker,
  findAllInstancesOfFirstLetter,
  parseInputToGrid,
  countAllInstancesOfWordFromCoordinates,
  createCrossedWordChecker,
} from './utils';

Logger.printHeader(4, 'Ceres Search');

const WORD_TO_SEARCH = 'XMAS';
const grid = parseInputToGrid(GRID_STRING);
const checkerFunction = BuildWordSearchChecker(grid, WORD_TO_SEARCH);
const startingCoordinates = findAllInstancesOfFirstLetter(
  grid,
  WORD_TO_SEARCH[0],
);

const instancesOfWord = startingCoordinates.reduce(
  (count, coordinate) =>
    count + countAllInstancesOfWordFromCoordinates(checkerFunction, coordinate),
  0,
);

console.log(
  `${chalk.bold.green('Day 4')} - part one: ${instancesOfWord}`,
  '\n',
);

const CROSSED_WORD = 'MAS';
const wordLength = CROSSED_WORD.length;
const indexOfMiddleLetter = Math.floor(wordLength / 2);
const middleLetter = CROSSED_WORD[indexOfMiddleLetter];

const crossedWorkChecker = createCrossedWordChecker(grid, CROSSED_WORD);
const coordinatesOfAllMiddleLetters = findAllInstancesOfFirstLetter(
  grid,
  middleLetter,
);
const instancesOfCrossedWord = coordinatesOfAllMiddleLetters.reduce(
  (count, coordinate) => (crossedWorkChecker(coordinate) ? count + 1 : count),
  0,
);

console.log(
  `${chalk.bold.green('Day 4')} - part two: ${instancesOfCrossedWord}`,
  '\n',
);
