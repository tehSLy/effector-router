import { createRouter, Router } from "./createRouter";

let singletonInstance: Router;

export const getInstance = () => {
	if(!singletonInstance){
		singletonInstance = createRouter();
	}

	return singletonInstance;
}