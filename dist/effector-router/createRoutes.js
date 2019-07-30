"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route_1 = require("./Route");
var singletonInstance_1 = require("./singletonInstance");
exports.createRoutes = function (schema, router) {
    router = router ? router : singletonInstance_1.getInstance();
    var result = {};
    for (var key in schema) {
        var template = schema[key];
        result[key] = Route_1.createRoute(template, router.path);
    }
    return result;
};
