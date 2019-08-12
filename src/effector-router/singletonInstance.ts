import { createRouter, Router } from "./createRouter";

let singletonInstance: Router;
let canUseSingleton = true;

export const setSingletonUsageAbility = (v: boolean) => canUseSingleton = v

export const getInstance = () => {
	if(!singletonInstance){
		singletonInstance = createRouter();
	}

	return canUseSingleton ? singletonInstance : undefined;
}