import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI): void {
  plop.setHelper('numberString', (number: number) =>
    `${number}`.padStart(2, '0'),
  );

  plop.setGenerator('day', {
    description: 'New day for Advent of Code',
    prompts: [
      {
        type: 'number',
        name: 'dayNumber',
        message: 'What day are you starting?',
      },
      {
        type: 'input',
        name: 'dayTitle',
        message: 'What is the title of this day?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/{{numberString dayNumber}}/index.ts',
        templateFile: 'templates/day/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{numberString dayNumber}}/fixtures/test-data.fixture.ts',
        templateFile: 'templates/day/test-data.fixture.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{numberString dayNumber}}/utils.ts',
        templateFile: 'templates/day/utils.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{numberString dayNumber}}/utils.test.ts',
        templateFile: 'templates/day/utils.test.ts.hbs',
      },
    ],
  });
}
