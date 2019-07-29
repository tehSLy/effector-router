import { createStore } from "effector";
import { createRouter } from "./createRouter";

const router = createRouter();
const routes = router.createRoutes({
	main: {path: "/main"},
	about: {path: "/about"}
})