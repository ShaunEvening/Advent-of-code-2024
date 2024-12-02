import INPUT from './input';

import {
  buildListsFromInput,
  computeDistanceBetweenLists,
  computeTotalSimilarityScore,
  sortListAscending,
} from './utils';

const { a, b } = buildListsFromInput(INPUT);
const sortedA = sortListAscending(a);
const sortedB = sortListAscending(b);
const difference = computeDistanceBetweenLists(sortedA, sortedB);

console.log('Day 01 - Part 1:', difference);

const similarityScore = computeTotalSimilarityScore(sortedA, sortedB);

console.log('Day 01 - Part 2:', similarityScore);
