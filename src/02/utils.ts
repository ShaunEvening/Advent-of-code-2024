type Report = number[];

export const parseReports = (reportsString: string): Report[] =>
  reportsString
    .split('\n')
    .map((report) => report.split(' ').map((value) => parseInt(value, 10)));

type numberDirection = 'asc' | 'desc';

const numberDirectionPredicate: Record<
  numberDirection,
  (a: number, b: number) => boolean
> = {
  asc: (a, b) => a < b,
  desc: (a, b) => a > b,
};
export const areReportNumbersSafe = (report: Report): boolean => {
  const lastIndexOfReport = report.length - 1;
  const [first, second] = report;
  const direction: numberDirection = first > second ? 'desc' : 'asc';
  const directionPredicate = numberDirectionPredicate[direction];

  return report.every((value, index, array) => {
    if (index === lastIndexOfReport) {
      return true;
    }

    const nextValue = array[index + 1];

    return (
      directionPredicate(value, nextValue) &&
      Math.abs(value - nextValue) <= 3 &&
      Math.abs(value - nextValue) !== 0
    );
  });
};

export const areReportNumbersSafeWithTolerance = (report: Report): boolean => {
  let indexToRemove = -1;
  let success = false;
  const lastIndexOfReport = report.length - 1;

  while (!success && indexToRemove <= lastIndexOfReport) {
    const reportCopy = report.filter((_, index) => index !== indexToRemove);
    if (!areReportNumbersSafe(reportCopy)) {
      indexToRemove++;
    } else {
      success = true;
    }
  }
  return success;
};

export const buildSafeReportsFilter =
  (predicate: (report: Report) => boolean) =>
  (reports: Report[]): Report[] =>
    reports.filter(predicate);

export const findSafeReports = buildSafeReportsFilter(areReportNumbersSafe);
export const findSafeReportsWithTolerance = buildSafeReportsFilter(
  areReportNumbersSafeWithTolerance,
);
