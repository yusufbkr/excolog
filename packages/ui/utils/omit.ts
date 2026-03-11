const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omit<T, K> => {
  const result = {} as Omit<T, K>;
  const exclude = new Set<keyof T>(keys);

  (Object.keys(obj) as (keyof T)[]).forEach((key) => {
    if (!exclude.has(key)) {
      (result as T)[key] = obj[key];
    }
  });

  return result;
};

export default omit;
