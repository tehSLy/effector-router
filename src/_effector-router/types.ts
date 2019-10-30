import { Store } from "effector";

export type Route<S> = {
  [key in keyof S]: S[key] extends Tuple<infer U>
    ? Route<U>
    : S[key] extends PathObjectConfig<infer D>
    ? Route<D>
    : Route<{}>;
};

export type PathSegment<S> =
  | Tuple<Schema<S>>
  | PathObjectConfig<Schema<S>>
  | string;

export type PathObjectConfig<S extends Schema<any>> = {
  exact: boolean;
  nested: S;
  path: string;
};

export type Schema<S> = { [key: string]: PathSegment<S> };

export type Tuple<S extends Schema<any>> = [string, S];

export type PathInfo<P, S = any> = {
  path: string;
  exact: boolean;
  schema: S;
  parent: Route<P>;

  match: (path: string) => { match: boolean; params: object };
  $match: Store<{ match: boolean; params: any }>;
  
  router: any;
  keys: any[];

  compile(args: {}): string;
  compile(...args: Array<string | number>): string;
};

declare const console: any;
