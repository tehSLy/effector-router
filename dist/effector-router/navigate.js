"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var singletonInstance_1 = require("./singletonInstance");
function navigate(path, router) {
    if (router === void 0) { router = singletonInstance_1.getInstance(); }
    var target = typeof path === "object" ? path.path() : path;
    return router.pushPath(target);
}
exports.navigate = navigate;
