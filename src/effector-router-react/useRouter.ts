import { useContext } from "react";
import { routerContext } from "./RouterContext";
import { getInstance } from "../effector-router/singletonInstance";

export function useRouter(){
	const contextRouter = useContext(routerContext);

	return contextRouter || getInstance();
}