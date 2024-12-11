import chalk from 'chalk';
import { Logger } from '@common/utils/console.utils';

import INPUT from './input';

import {
  findGuardsPosition,
  parseInputToGrid,
  mapGuardCharToDirection,
  GuardChar,
  determineGuardsPath,
  getUniquieVisitedPositions,
  determineLoopPossibilities,
  getAllObstacles,
} from './utils';

Logger.printHeader(6, 'Guard Gallivant');

const initialGrid = parseInputToGrid(INPUT);
const guardStartingPosition = findGuardsPosition(initialGrid);

const guardsPath = determineGuardsPath(initialGrid, guardStartingPosition);

const uniquePositions = getUniquieVisitedPositions(guardsPath);

console.log(
  `${chalk.bold.green('Day 6')} - part one: ${uniquePositions.length}`,
  '\n',
);

const obstacles = getAllObstacles(initialGrid);

const allLoopPossibilities = determineLoopPossibilities(
  initialGrid,
  guardsPath,
);

console.log(
  `${chalk.bold.green('Day 6')} - part two: ${allLoopPossibilities.length}`,
  '\n',
);
