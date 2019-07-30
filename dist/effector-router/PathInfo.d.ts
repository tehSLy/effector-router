export declare type PathInfo<S> = PathInfoObject<S> | PathInfoTuple<S>;
export declare type PathInfoObject<S> = {
    path: string;
    nested?: S;
    exact?: boolean;
};
export declare type PathInfoTuple<S> = [string, S];
