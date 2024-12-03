import {
  parseReports,
  findSafeReports,
  findSafeReportsWithTolerance,
} from './utils';
import INPUT from './input';

const reports = parseReports(INPUT);
const safeReports = findSafeReports(reports);

console.log('Day 2 - part one: # of safe reports', safeReports.length);

const safeReportsWithTolerance = findSafeReportsWithTolerance(reports);

console.log(
  'Day 2 - part two: # of safe reports with tolerance',
  safeReportsWithTolerance.length,
);
