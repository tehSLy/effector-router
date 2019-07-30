export declare function useRouter(): {
    location: import("effector").Store<import("history").Location<any>>;
    pushPath: any;
    pushSearch: any;
    match: (template: string) => import("effector").Store<import("../effector-router").Match<{}>>;
    history: import("history").History<any>;
    path: import("effector").Store<string>;
};
