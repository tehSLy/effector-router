import * as React from 'react'
import {Route as RouteInfo} from "../effector-router/Route";
import {useRoute} from "./useRoute";
import {useRouter} from "./useRouter";

export type RouteProps = {
	exact?: boolean;
	render?(params: any): React.ReactNode;
	children?: React.ReactNode;
	component?: React.ComponentType;
	path: string | RouteInfo<any>
}

export const Route = ({path, children, component: Component, exact, render}: RouteProps) => {
	const router = useRouter();
	const [matched, params] = useRoute(path as any, exact, router);

	if(!matched){
		return null;
	}

	if(render){
		return render(params);
	}

	if(Component){
		return <Component />
	}

	return children;
}