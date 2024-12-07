import { describe, it, expect } from 'vitest';
import {
  parseInstructionFromCorruptMemoryString,
  executeValidInstruction,
  sumOfInstructions,
  parseDoInstructionsFromCorruptMemoryString,
} from './utils';

import TEST_INPUT from './fixtures/corrupt-memory-string.fixture';
import TEST_INPUT_WITH_DOS_AND_DONTS from './fixtures/corrupt-with-dos-and-donts.fixture';

describe('DAY 03:', () => {
  describe('UTILS:', () => {
    describe('UTIL: parseInstructionFromCorruptMemoryString', () => {
      it('should return the correct instruction', () => {
        const input = TEST_INPUT;
        const result = parseInstructionFromCorruptMemoryString(input);
        const expected = ['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)'];

        expect(result).toEqual(expected);
      });

      it('It should not return matches with numbers over 3 digits long', () => {
        const input = 'mul(2,4)mul(5,5)%BA756(mul(100,1000)';
        const result = parseInstructionFromCorruptMemoryString(input);
        const expected = ['mul(2,4)', 'mul(5,5)'];

        expect(result).toEqual(expected);
      });

      describe('UTIL: executeValidInstruction', () => {
        it('should return the correct result', () => {
          const input = 'mul(2,4)';
          const result = executeValidInstruction(input);
          const expected = 8;

          expect(result).toBe(expected);
        });
      });

      describe('UTIL: sumOfInstructions', () => {
        it('should return the correct sum', () => {
          const input = ['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)'];
          const result = sumOfInstructions(input);
          const expected = 161;

          expect(result).toBe(expected);
        });
      });

      describe('UTIL: parseDoInstructionsFromCorruptMemoryString', () => {
        it('should return the correct instructions', () => {
          const input = TEST_INPUT_WITH_DOS_AND_DONTS;
          const result = parseDoInstructionsFromCorruptMemoryString(input);
          const expected = ['mul(2,4)', 'mul(8,5)'];

          expect(result).toEqual(expected);
        });
      });
    });
  });
});
