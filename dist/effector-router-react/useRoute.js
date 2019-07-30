"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var effector_react_1 = require("effector-react");
var singletonInstance_1 = require("../effector-router/singletonInstance");
var react_1 = require("react");
var createMatcher_1 = require("../effector-router/createMatcher");
var RouterContext_1 = require("./RouterContext");
function useRoute(param, exact, router) {
    var store = react_1.useRef();
    var contextRouter = react_1.useContext(RouterContext_1.routerContext);
    if (!store.current) {
        // const exactPath: string = typeof param === "object" ? param.normalizedPath : param;
        var routerComputed = router || contextRouter || singletonInstance_1.getInstance();
        var matcher = typeof param === "string" ? createMatcher_1.createMatcher(param) : param.matcher;
        store.current = routerComputed.path.map(matcher);
    }
    var match = effector_react_1.useStore(store.current);
    return [match.matched, match.params];
}
exports.useRoute = useRoute;
