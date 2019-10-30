import { Route } from "./types";
import { routes } from "./routesMap";

export const getParent = <S>(route: Route<S>) => {
	const info = routes.get(route)
	if(!info){
		throw new Error();
	}

	return info.parent;
}