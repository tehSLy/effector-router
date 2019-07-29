import pathToRegexp from "path-to-regexp";

export const createMatcher = (template: string) => {
	const keys: pathToRegexp.Key[] = [];
	const regexp = pathToRegexp(template, keys);

	return (path: string) => {
		const result = regexp.exec(path);
		const matched = result !== null;
		console.log({regexp});
		const paramsResult = result ? result.splice(1, result.length - 1) : null;
		const params = paramsResult
			? keys.reduce((carry, key, idx) => ((carry[key.name] = paramsResult[idx]), carry), {} as any)
			: null;

		return { matched, params };
	};
};