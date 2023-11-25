export function groupBy<T>(arr: T, property) {
  return arr.reduce((memo, x) => {
    if (!memo[x[property]]) memo[x[property]] = [];
    memo[x[property]].push(x)
    return memo
  }, {}) as Record<string, T>
}
