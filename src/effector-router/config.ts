import { setSingletonUsageAbility } from "./singletonInstance";

export type RoutingConfig = {
	noSingleton?: boolean;
	
}

export const initRouting = (config: RoutingConfig) => {
	if(config.noSingleton){
		setSingletonUsageAbility(false);
	}

	
}