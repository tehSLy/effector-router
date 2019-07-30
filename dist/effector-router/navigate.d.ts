import { Router } from "./createRouter";
import { Route } from "./Route";
export declare function navigate(path: string, router?: Router): void;
export declare function navigate(path: Route<any>, router?: Router): void;
