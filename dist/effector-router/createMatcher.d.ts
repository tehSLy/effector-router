import pathToRegexp from "path-to-regexp";
import { Match } from "./Match";
export declare type Matcher = (path: string) => Match;
export declare const createMatcher: (template: string, keys?: pathToRegexp.Key[]) => Matcher;
