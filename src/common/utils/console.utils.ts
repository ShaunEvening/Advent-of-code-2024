import boxen from 'boxen';
import chalk from 'chalk';
import dedent from 'dedent';

const printScriptHeader = (day: number, title: string): void => {
  console.log(
    boxen(
      dedent`${chalk.bold('🎄 Advent of Code 2024 🎄')}
    
  Day ${day} - ${title}`,
      {
        padding: 1,
        borderStyle: 'round',
        borderColor: 'green',
        textAlignment: 'center',
      },
    ),
    '\n\n',
  );
};

export const Logger = {
  printHeader: printScriptHeader,
};
