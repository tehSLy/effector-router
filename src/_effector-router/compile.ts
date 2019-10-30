import pathToRegexp from "path-to-regexp";
import { routes } from "./routesMap";

export const compile = (route: Route<any>, ...args: any[]) => {
  const info = routes.get(route);
  if (!info) {
    throw new Error("No route was associated");
  }

  return info.compile(args);
};

export const resolveArgsObject = (args: any, keys: any[]) => {
  if (!args || !args.length) {
    return {};
  }

  return typeof args[0] !== "object"
    ? keys.reduce(
        (carry: any, key, idx) => ((carry[key.name] = args[idx] || ""), carry),
        {}
      )
    : args[0];
};

export const createCompiler = (template: string) => {
  const keys: any[] = [];
  const regexp = pathToRegexp(template, keys);

  const compiler = pathToRegexp.compile(template);
  const compile = (args: any) => {
    const options = resolveArgsObject(args, keys);
    return compiler(options);
  };

  return {
    keys,
    compile
  };
};

declare const console: any;
