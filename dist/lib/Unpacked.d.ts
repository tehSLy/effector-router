export declare type Unpacked<S, T = any> = {
    [key in keyof S]: S[key] extends object ? Unpacked<S[key], T> : T;
};
