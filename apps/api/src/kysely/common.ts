export const groupByKey = <
	T extends Record<string, unknown>,
	K extends keyof T,
	R = T,
>(
	data: T[],
	key: K,
	transform?: (item: T) => R,
): Record<string, R[]> => {
	return data.reduce(
		(acc, item) => {
			const keyValue = item[key];
			if (!keyValue) return acc;

			const keyString = String(keyValue);
			if (!acc[keyString]) acc[keyString] = [];
			acc[keyString].push((transform ? transform(item) : item) as R);
			return acc;
		},
		{} as Record<string, R[]>,
	);
};
