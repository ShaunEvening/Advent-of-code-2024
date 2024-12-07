import chalk from 'chalk';
import { readFileSync } from 'fs';
import { Logger } from '@common/utils/console.utils';

import {
  parseInstructionFromCorruptMemoryString,
  parseDoInstructionsFromCorruptMemoryString,
  sumOfInstructions,
} from './utils';

Logger.printHeader(3, 'Mull It Over');

const input = readFileSync(new URL('input.txt', import.meta.url), 'utf-8');
const validInstructions = parseInstructionFromCorruptMemoryString(input);

const sum = sumOfInstructions(validInstructions);

console.log(`${chalk.bold.green('Day 3')} - part one: ${sum}`, '\n');

const validDoInstructions = parseDoInstructionsFromCorruptMemoryString(input);
const sumDo = sumOfInstructions(validDoInstructions);

console.log(`${chalk.bold.green('Day 3')} - part two: ${sumDo}`, '\n');
