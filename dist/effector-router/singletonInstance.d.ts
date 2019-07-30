export declare const getInstance: () => {
    location: import("effector").Store<import("history").Location<any>>;
    pushPath: any;
    pushSearch: any;
    match: (template: string) => import("effector").Store<import("./Match").Match<{}>>;
    history: import("history").History<any>;
    path: import("effector").Store<string>;
};
