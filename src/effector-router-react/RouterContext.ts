import { createContext } from "react";
import { Router } from "../effector-router/createRouter";

export const routerContext = createContext<Router>(null as any);