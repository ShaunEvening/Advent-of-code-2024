import { describe, expect, it } from 'vitest';
import {
  parseReports,
  areReportNumbersSafe,
  findSafeReports,
  areReportNumbersSafeWithTolerance,
  findSafeReportsWithTolerance,
} from './utils';

import TEST_DATA from './fixtures/test-data.fixture';

describe('DAY 02:', () => {
  describe('UTILS:', () => {
    describe('UTIL: parseReports', () => {
      it('should return the correct lists', () => {
        const input = TEST_DATA;
        const result = parseReports(input);
        const expected = [
          [7, 6, 4, 2, 1],
          [1, 2, 7, 8, 9],
          [9, 7, 6, 2, 1],
          [1, 3, 2, 4, 5],
          [8, 6, 4, 4, 1],
          [1, 3, 6, 7, 9],
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('UTIL: areReportNumbersSafe', () => {
      it('TRUE: should return true when a report has only decreases <= 3', () => {
        const input = [7, 6, 4, 2, 1];
        const result = areReportNumbersSafe(input);

        expect(result).toBeTruthy();
      });

      it('FALSE: should return false when a report has an increase higher than 3', () => {
        const input = [1, 2, 7, 8, 9];
        const result = areReportNumbersSafe(input);

        expect(result).toBeFalsy();
      });

      it('FALSE: should return false when a report has a decrease higher than 3', () => {
        const input = [9, 7, 6, 2, 1];
        const result = areReportNumbersSafe(input);

        expect(result).toBeFalsy();
      });

      it('FALSE: should return false when a report has decreases and increases', () => {
        const input = [1, 3, 2, 4, 5];
        const result = areReportNumbersSafe(input);

        expect(result).toBeFalsy();
      });

      it('FALSE: should return false when a report has two of the same numbers consecutively', () => {
        const input = [8, 6, 4, 4, 1];
        const result = areReportNumbersSafe(input);

        expect(result).toBeFalsy();
      });

      it('TRUE: should return true when a report has only increases <= 3', () => {
        const input = [1, 3, 6, 7, 9];
        const result = areReportNumbersSafe(input);

        expect(result).toBeTruthy();
      });
    });

    describe('UTIL: areReportNumbersSafeWithTolerance', () => {
      it('TRUE: should return true when a report has only decreases <= 3', () => {
        const input = [7, 6, 4, 2, 1];
        const result = areReportNumbersSafeWithTolerance(input);

        expect(result).toBeTruthy();
      });

      it('FALSE: should return false when a report has an increase higher than 3', () => {
        const input = [1, 2, 7, 8, 9];
        const result = areReportNumbersSafeWithTolerance(input);

        expect(result).toBeFalsy();
      });

      it('FALSE: should return false when a report has a decrease higher than 3', () => {
        const input = [9, 7, 6, 2, 1];
        const result = areReportNumbersSafeWithTolerance(input);

        expect(result).toBeFalsy();
      });

      it('TRUE: should return false when a report has decreases and increases', () => {
        const input = [1, 3, 2, 4, 5];
        const result = areReportNumbersSafeWithTolerance(input);

        expect(result).toBeTruthy();
      });

      it('TRUE: should return false when a report has two of the same numbers consecutively', () => {
        const input = [8, 6, 4, 4, 1];
        const result = areReportNumbersSafeWithTolerance(input);

        expect(result).toBeTruthy();
      });

      it('TRUE: should return true when a report has only increases <= 3', () => {
        const input = [1, 3, 6, 7, 9];
        const result = areReportNumbersSafeWithTolerance(input);

        expect(result).toBeTruthy();
      });
    });

    describe('UTIL: findSafeReports', () => {
      it('It should return a list of safe reports', () => {
        const input = [
          [7, 6, 4, 2, 1],
          [1, 2, 7, 8, 9],
          [9, 7, 6, 2, 1],
          [1, 3, 2, 4, 5],
          [8, 6, 4, 4, 1],
          [1, 3, 6, 7, 9],
        ];

        const result = findSafeReports(input);

        expect(result.length).toEqual(2);
      });
    });

    describe('UTIL: findSafeReportsWithTolerance', () => {
      it('It should return a list of safe reports', () => {
        const input = [
          [7, 6, 4, 2, 1],
          [1, 2, 7, 8, 9],
          [9, 7, 6, 2, 1],
          [1, 3, 2, 4, 5],
          [8, 6, 4, 4, 1],
          [1, 3, 6, 7, 9],
        ];

        const result = findSafeReportsWithTolerance(input);

        expect(result.length).toEqual(4);
      });
    });
  });
});
