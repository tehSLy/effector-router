import { Store } from "effector";
import pathToRegexp from "path-to-regexp";
import { createMatcher, Matcher } from "./createMatcher";
import { Match } from "./Match";
import { normalizePath } from "./normalizePath";
import { PathInfo, PathInfoObject, PathInfoTuple } from "./PathInfo";

interface UnregisterCallback {
	(): void;
}

type Watcher<T> = ( data: T ) => UnregisterCallback;

export type Route<S> = {
	// watch( watcher: Watcher<Match> ): any;
	readonly match: Store<Match>
	// readonly matcher: Matcher; // should be hidden
	// readonly normalizedPath: string; // should be hidden

	path( param?: string ): string;
	path( ...params: string[] ): string;
	path( params: {} ): string;
} & { [key in keyof S]: Route<S[key] extends object ? S[key] : void> }


export function createRoute<S>( params: string, $path: Store<string>, prefix?: string ): Route<S>
export function createRoute<S extends { [key: string]: string | PathInfo<any> }>( params: PathInfoObject<S>, $path: Store<string>, prefix?: string ): Route<S>
export function createRoute<S extends { [key: string]: string | PathInfo<any> }>( params: PathInfoTuple<S>, $path: Store<string>, prefix?: string ): Route<S>
export function createRoute( params: any, $path: Store<string>, prefix = "" ): any {
	const { nested, template, exact } = resolvePathInfo( params );
	const compilePath = normalizePath( prefix, template );
	const hasNested = Object.keys( nested ).length > 0;
	const matchPath = normalizePath( compilePath + ( hasNested && !exact ? ":nested(.*)" : "" ) )

	const compiler = pathToRegexp.compile( compilePath );
	const keys: pathToRegexp.Key[] = [];
	const matcher = createMatcher( matchPath, keys );
	const $match = $path.map( matcher );

	const compile = ( ...args: any ) => {
		const params: any = typeof args[0] !== "object"
			? keys.reduce( ( carry: any, key, idx ) => ( carry[key.name] = args[idx] || "", carry ), {} )
			: args[0];

		return compiler( params );
	}

	const nestedRoutes: any = {};
	for ( const route in nested )
	{
		nestedRoutes[route] = createRoute( nested[route], $path, compilePath );
	}

	const result = {
		...nestedRoutes,
		path: compile,
		match: $match,
		// watch: $match.watch,
		// matcher,
		// normalizedPath: matchPath //why we need this??
	};

	return result;
}

const resolvePathInfo = ( param: any ): { template: string, nested: any, exact: boolean } => {
	if ( param instanceof Array )
	{
		return {
			template: param[0],
			nested: param[1],
			exact: false
		}
	}

	if ( typeof param === "string" )
	{
		return {
			template: param,
			nested: {},
			exact: false
		}
	}

	return {
		template: param.path,
		nested: param.nested,
		exact: param.exact
	};
}