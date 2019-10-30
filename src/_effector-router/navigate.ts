import { Route } from "./types";
import { resolveArgsObject } from "./compile";
import { getInstance } from "./getInstance";

type Config = {
	route: Route<any>;
	router?: any;
	args?: object | any[];
	search?: object;
}

export function navigate(config: Config): void;
export function navigate(route: Route<any>, ...args: any[]): void;
export function navigate(param: any, ...argsArray: any[]){
	let route, args, router;
	if(param.route){
		route = param.route;
		args = param.args;
		router = param.router
	} else{
		route = param;
		if(typeof argsArray[argsArray.length - 1] === "object"){
			router = argsArray.splice(-1);
		}
		args = argsArray;
	}

	if(!router){
		router = getInstance();
	}

	return router.navigate({route, args});
}