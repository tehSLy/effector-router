import { createRouter, Router } from "./createRouter";

let singletonInstance: Router;
let canUseSingleton = true;

export const setSingletonUsageAbility = (v: boolean) => (canUseSingleton = v);

export const getInstance = () => {
  if (!singletonInstance) {
    singletonInstance = createRouter();
  }

  if (!canUseSingleton) {
    throw new Error(
      "Unable to use singleton instance, when this option set to `false`"
    );
  }

  return singletonInstance;
};
