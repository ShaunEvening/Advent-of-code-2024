import chalk from 'chalk';

const INSTRUCTION_REGEX = /mul\(\d{1,3},\d{1,3}\)/g;
export const parseInstructionFromCorruptMemoryString = (
  memoryString: string,
): string[] => {
  const matches = memoryString.match(INSTRUCTION_REGEX);

  if (!matches) {
    return [];
  }

  return matches.map((match) => match);
};

export const executeValidInstruction = (instruction: string): number => {
  const [first, second] = instruction
    .match(/\d+/g)!
    .map((value) => parseInt(value, 10));

  return first * second;
};

export const sumOfInstructions = (instructions: string[]): number =>
  instructions.reduce(
    (acc, instruction) => acc + executeValidInstruction(instruction),
    0,
  );

export const parseDoInstructionsFromCorruptMemoryString = (
  memoryString: string,
): string[] =>
  memoryString.split("don't()").reduce((acc, segment, index) => {
    if (index === 0) {
      return [...acc, ...parseInstructionFromCorruptMemoryString(segment)];
    }
    const [a, ...rest] = segment.split('do()');
    const validSegment = rest.join('');
    return [...acc, ...parseInstructionFromCorruptMemoryString(validSegment)];
  }, [] as string[]);
