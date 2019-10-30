import { createCompiler } from "./compile";
import { getInstance } from "./getInstance";
import { createMatcher } from "./match";
import { routes } from "./routesMap";
import { Route, Schema } from "./types";

const Route = Object.create(null);

export const createRoutes = <S extends Schema<S>>(
  schema: S,
  router: any = getInstance()
): Route<S> => {
  return parseSchema(schema);

  function parseSchema<S extends Schema<S>>(
    schema: S,
    parent?: Route<any>
  ): Route<S> {
    const result: any = {};
    for (const name in schema) {
      const routeInfo = schema[name];
      const pathInfo = getInfo(routeInfo);
      const route: Route<any> = Object.create(Route);
      const parentInfo = parent ? routes.get(parent) : null;
      const path = parentInfo
        ? [parentInfo.path, pathInfo.path]
            .join("/")
            .replace(normalizeRegexp, "/")
        : pathInfo.path;

      Object.assign(pathInfo, {
        router,
        path
      });

      pathInfo.match = createMatcher(pathInfo.path, pathInfo.exact);
      pathInfo.$match = router.$path.map(pathInfo.match);
      Object.assign(pathInfo, createCompiler(pathInfo.path));
      routes.set(route, pathInfo);

      if (pathInfo.schema) {
        //assigning nested routes to public object
        Object.assign(route, parseSchema(pathInfo.schema, route));
      }

      // caching resulting route
      result[name] = route;
    }

    return result as any;
  }
};

const getInfo = (segment: any): any => {
  if (segment instanceof Array) {
    //tuple
    return {
      exact: false,
      schema: segment[1],
      path: segment[0]
    };
  }

  if (typeof segment === "string") {
    return {
      exact: true,
      schema: null,
      path: segment
    };
  }

  if (segment && typeof segment === "object") {
    return {
      exact: segment.exact,
      schema: segment.nested,
      path: segment.path
    };
  }

  throw new Error(
    `Path segment must be a Tuple, String or Configuration Object, got [${segment}] instead`
  );
};

const normalizeRegexp = new RegExp("//", "g");
