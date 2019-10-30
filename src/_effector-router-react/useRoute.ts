import {Route} from "../_effector-router/types";
import { getInstance} from "../_effector-router/getInstance";
import { useCallback, useState, useRef } from "react";
import { routes } from "../_effector-router/routesMap";
import {useStore} from "effector-react";
export const useRoute = (route: Route<any>) => {
	const info = useRef(routes.get(route));
	return useStore(info.current!.$match);
}