export const pluckMiddleOfArray = <T>(arr: T[]): T =>
  arr[Math.floor(arr.length / 2)];

export const sumArray = (arr: number[]) =>
  arr.reduce((acc, val) => acc + val, 0);
