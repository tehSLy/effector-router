import { Router } from "./createRouter";
import { getInstance } from "./singletonInstance";
import { Route } from "./Route";


export function navigate(path: string, router?: Router): void
export function navigate(path: Route<any>, router?: Router): void
export function navigate(path: any, router: Router = getInstance()){
	const target = typeof path === "object" ? path.path() : path;
	return router.pushPath(target);
}