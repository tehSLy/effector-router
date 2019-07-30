import { Route } from "../effector-router/Route";
import { Router } from "../effector-router/createRouter";
export declare function useRoute<S = any>(template: string, exact?: boolean, router?: Router): [boolean, S];
export declare function useRoute<S = any>(route: Route<any>, exact?: boolean, router?: Router): [boolean, S];
