type OrderRule = [before: number, after: number];
type ManualPageUpdate = number[];

export const parseInput = (input: string) => {
  const [rules, pageUpdates] = input.split('\n\n');
  const orderRules: OrderRule[] = rules.split('\n').map((rule) => {
    const [before, after] = rule.split('|');
    return [Number(before), Number(after)] satisfies OrderRule;
  });
  const manualPageUpdates: ManualPageUpdate[] = pageUpdates
    .split('\n')
    .map((update) => update.split(',').map(Number));

  return [orderRules, manualPageUpdates] as const;
};

export const buildRulesChecker =
  (rules: OrderRule[]) => (updateArray: ManualPageUpdate) =>
    rules.every(([before, after]) => {
      const beforeIndex = updateArray.indexOf(before);
      const afterIndex = updateArray.indexOf(after);
      if (beforeIndex === -1 || afterIndex === -1) {
        return true;
      }
      return beforeIndex < afterIndex;
    });

export const buildSortingFunction =
  (rules: OrderRule[]) => (a: number, b: number) => {
    const rule = rules.find((rule) => rule.includes(a) && rule.includes(b));
    if (!rule) {
      return 0;
    }
    const [before] = rule;

    return a === before ? -1 : 1;
  };
