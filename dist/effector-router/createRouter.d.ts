import { History, Location } from "history";
import { Store } from "effector";
export declare type Router = ReturnType<typeof createRouter>;
export declare const createRouter: (history?: History<any>) => {
    location: Store<Location<any>>;
    pushPath: any;
    pushSearch: any;
    match: (template: string) => Store<import("./Match").Match<{}>>;
    history: History<any>;
    path: Store<string>;
};
