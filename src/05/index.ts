import chalk from 'chalk';
import { Logger } from '@common/utils/console.utils';
import { pluckMiddleOfArray, sumArray } from '@common/utils/array.utils';

import { buildRulesChecker, buildSortingFunction, parseInput } from './utils';
import INPUT from './input';

Logger.printHeader(5, 'Print Queue');

const [rules, updates] = parseInput(INPUT);

const rulesChecker = buildRulesChecker(rules);
const validUpdates = updates.filter(rulesChecker);

const sumOfMiddleNumbers = sumArray(validUpdates.map(pluckMiddleOfArray));

console.log(
  `${chalk.bold.green('Day 5')} - part one: ${sumOfMiddleNumbers}`,
  '\n',
);

const invalidUpdates = updates.filter((update) => !rulesChecker(update));
const sortingFunction = buildSortingFunction(rules);

const SortedMiddleNumbers = invalidUpdates.map((update) => {
  const sorted = update.sort(sortingFunction);

  return pluckMiddleOfArray(sorted);
});

const sortedSum = sumArray(SortedMiddleNumbers);

console.log(`${chalk.bold.green('Day 5')} - part two: ${sortedSum}`, '\n');
