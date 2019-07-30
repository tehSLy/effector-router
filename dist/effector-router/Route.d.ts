import { Store } from "effector";
import { Matcher } from "./createMatcher";
import { Match } from "./Match";
import { PathInfo, PathInfoObject, PathInfoTuple } from "./PathInfo";
interface UnregisterCallback {
    (): void;
}
declare type Watcher<T> = (data: T) => UnregisterCallback;
export declare type Route<S> = {
    watch(watcher: Watcher<Match>): any;
    readonly match: Store<Match>;
    readonly matcher: Matcher;
    readonly normalizedPath: string;
    path(param: string): string;
    path(...params: string[]): string;
    path(params: {}): string;
} & {
    [key in keyof S]: Route<S[key] extends object ? S[key] : void>;
};
export declare function createRoute<S>(params: string, $path: Store<string>, prefix?: string): Route<S>;
export declare function createRoute<S extends {
    [key: string]: string | PathInfo<any>;
}>(params: PathInfoObject<S>, $path: Store<string>, prefix?: string): Route<S>;
export declare function createRoute<S extends {
    [key: string]: string | PathInfo<any>;
}>(params: PathInfoTuple<S>, $path: Store<string>, prefix?: string): Route<S>;
export {};
