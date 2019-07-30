import { PathInfo } from "./PathInfo";
import { Route } from "./Route";
export declare const createRoutes: <K extends keyof S, S extends {
    [key: string]: string | import("./PathInfo").PathInfoObject<any> | [string, any];
}>(schema: S, router?: {
    location: import("effector").Store<import("history").Location<any>>;
    pushPath: any;
    pushSearch: any;
    match: (template: string) => import("effector").Store<import("./Match").Match<{}>>;
    history: import("history").History<any>;
    path: import("effector").Store<string>;
} | undefined) => { [key in K]: S[key] extends PathInfo<infer P> ? Route<P> : Route<void>; };
