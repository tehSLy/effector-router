import { createBrowserHistory } from "history";
import { createRouter, Router } from "./createRouter";

let instance: Router;

export const getInstance = () => {
  if (!instance) {
    instance = createRouter(createBrowserHistory());
  }

  return instance;
};

export const setInstance = (newInstance: any) => instance = newInstance