// export type PathInfo<S extends {[key: string]: PathInfo<any> | string}> = {
// 	path: string;
// 	nested: S
// }

export type PathInfo<S> = PathInfoObject<S> | PathInfoTuple<S>

export type PathInfoObject<S> = {
	path: string;
	nested?: S;
	exact?: boolean;
}

export type PathInfoTuple<S> = [string, S]