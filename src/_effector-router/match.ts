import pathToRegexp from "path-to-regexp";
import { routes } from "./routesMap";
import { Route } from "./types";

export const match = <S>(route: Route<any>, handler: (params: S) => void) => {
  const info = routes.get(route);
  if (!info) {
    throw new Error("Unable to resolve matcher");
  }

  const { match, router } = info;
  const $match = router.$path.map(match);
  return $match.watch(({ match, params }: any) =>
    match ? handler(params) : null
  );
};

export const createMatcher = (template: string, exact: boolean) => {
  const keys: any[] = [];
  const regexp = pathToRegexp(template, keys, {
    end: exact
  });

  return (path: string) => {
    const result = regexp.exec(path);
    if (!result) {
      return { match: false, params: null };
    }

    const [_, ...args] = result;
    const params = keys.reduce(
      (carry, key, idx) => ((carry[key.name] = args[idx]), carry),
      {}
    );
    return {params, match: true}
  };
};
