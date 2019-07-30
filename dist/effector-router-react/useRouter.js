"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var RouterContext_1 = require("./RouterContext");
var singletonInstance_1 = require("../effector-router/singletonInstance");
function useRouter() {
    var contextRouter = react_1.useContext(RouterContext_1.routerContext);
    return contextRouter || singletonInstance_1.getInstance();
}
exports.useRouter = useRouter;
