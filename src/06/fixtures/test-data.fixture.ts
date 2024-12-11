export default `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

export const INPUT_AS_GRID = [
  ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '#', '.', '.', '^', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '#', '.'],
  ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
];

export const OBSTACLE_COORDINATES = [
  [4, 0],
  [9, 1],
  [2, 3],
  [7, 4],
  [1, 6],
  [8, 7],
  [0, 8],
  [6, 9],
];

export const GUARD_PATH_ON_GRID = [
  {
    direction: 'N',
    position: [4, 6],
  },
  {
    direction: 'N',
    position: [4, 5],
  },
  {
    direction: 'N',
    position: [4, 4],
  },
  {
    direction: 'N',
    position: [4, 3],
  },
  {
    direction: 'N',
    position: [4, 2],
  },
  {
    direction: 'N',
    position: [4, 1],
  },
  {
    direction: 'E',
    position: [5, 1],
  },
  {
    direction: 'E',
    position: [6, 1],
  },
  {
    direction: 'E',
    position: [7, 1],
  },
  {
    direction: 'E',
    position: [8, 1],
  },
  {
    direction: 'S',
    position: [8, 2],
  },
  {
    direction: 'S',
    position: [8, 3],
  },
  {
    direction: 'S',
    position: [8, 4],
  },
  {
    direction: 'S',
    position: [8, 5],
  },
  {
    direction: 'S',
    position: [8, 6],
  },
  {
    direction: 'W',
    position: [7, 6],
  },
  {
    direction: 'W',
    position: [6, 6],
  },
  {
    direction: 'W',
    position: [5, 6],
  },
  {
    direction: 'W',
    position: [4, 6],
  },
  {
    direction: 'W',
    position: [3, 6],
  },
  {
    direction: 'W',
    position: [2, 6],
  },
  {
    direction: 'N',
    position: [2, 5],
  },
  {
    direction: 'N',
    position: [2, 4],
  },
  {
    direction: 'E',
    position: [3, 4],
  },
  {
    direction: 'E',
    position: [4, 4],
  },
  {
    direction: 'E',
    position: [5, 4],
  },
  {
    direction: 'E',
    position: [6, 4],
  },
  {
    direction: 'S',
    position: [6, 5],
  },
  {
    direction: 'S',
    position: [6, 6],
  },
  {
    direction: 'S',
    position: [6, 7],
  },
  {
    direction: 'S',
    position: [6, 8],
  },
  {
    direction: 'W',
    position: [5, 8],
  },
  {
    direction: 'W',
    position: [4, 8],
  },
  {
    direction: 'W',
    position: [3, 8],
  },
  {
    direction: 'W',
    position: [2, 8],
  },
  {
    direction: 'W',
    position: [1, 8],
  },
  {
    direction: 'N',
    position: [1, 7],
  },
  {
    direction: 'E',
    position: [2, 7],
  },
  {
    direction: 'E',
    position: [3, 7],
  },
  {
    direction: 'E',
    position: [4, 7],
  },
  {
    direction: 'E',
    position: [5, 7],
  },
  {
    direction: 'E',
    position: [6, 7],
  },
  {
    direction: 'E',
    position: [7, 7],
  },
  {
    direction: 'S',
    position: [7, 8],
  },
  {
    direction: 'S',
    position: [7, 9],
  },
];
