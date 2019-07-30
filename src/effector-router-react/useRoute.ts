import { Route } from "../effector-router/Route";
import {useStore} from "effector-react"
import { Router } from "../effector-router/createRouter";
import { getInstance } from "../effector-router/singletonInstance";
import { useRef, useContext } from "react";
import { createMatcher } from "../effector-router/createMatcher";
import { routerContext } from "./RouterContext";
import { Store } from "effector";
import { Match } from "../effector-router/Match";

export function useRoute<S = any>(template: string, exact?: boolean, router?: Router): [boolean, S]
export function useRoute<S = any>(route: Route<any>, exact?: boolean, router?: Router): [boolean, S]
export function useRoute(param: any, exact?: boolean, router?: Router){
	const store = useRef<Store<Match>>();
	const contextRouter = useContext(routerContext);

	if(!store.current){
		// const exactPath: string = typeof param === "object" ? param.normalizedPath : param;
		const routerComputed = router || contextRouter || getInstance();
		const matcher = typeof param === "string" ? createMatcher(param) : param.matcher;
		store.current = routerComputed.path.map(matcher)
	}

	const match = useStore(store.current!);

	return [match.matched, match.params]
}