import { Router } from "./createRouter";
import { PathInfo } from "./PathInfo";
import { createRoute, Route } from "./Route";
import { getInstance } from "./singletonInstance";

export const createRoutes = <
	K extends keyof S,
	S extends { [key: string]: string | PathInfo<any> }
>(
	schema: S,
	router?: Router
) => {
	router = router ? router : getInstance();
	if(!router){
		throw new Error("Cannot create routes, since no router found: either noSingleton option is `true`, or router has been passed into is not a router");
	}
	const result: any = {};
	
	for (const key in schema) {
		const template = schema[key];
		result[key] = createRoute(template as any, router.path);
	}

	return result as {
		[key in K]: typeof schema[key] extends PathInfo<infer P>
			? Route<P>
			: Route<void>
	};
};
