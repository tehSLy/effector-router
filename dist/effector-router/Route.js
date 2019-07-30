"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_to_regexp_1 = __importDefault(require("path-to-regexp"));
var createMatcher_1 = require("./createMatcher");
var normalizePath_1 = require("./normalizePath");
function createRoute(params, $path, prefix) {
    if (prefix === void 0) { prefix = ""; }
    var _a = resolvePathInfo(params), nested = _a.nested, template = _a.template, exact = _a.exact;
    var compilePath = normalizePath_1.normalizePath(prefix, template);
    var hasNested = Object.keys(nested).length > 0;
    var matchPath = normalizePath_1.normalizePath(compilePath + (hasNested && !exact ? ":nested(.*)" : ""));
    var compiler = path_to_regexp_1.default.compile(compilePath);
    var keys = [];
    var matcher = createMatcher_1.createMatcher(matchPath, keys);
    console.log({ keys: keys, matchPath: matchPath, compilePath: compilePath });
    var $match = $path.map(matcher);
    var compile = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = typeof args[0] !== "object"
            ? keys.reduce(function (carry, key, idx) { return (carry[key.name] = args[idx] || "", carry); }, {})
            : args[0];
        return compiler(params);
    };
    var nestedRoutes = {};
    for (var route in nested) {
        nestedRoutes[route] = createRoute(nested[route], $path, compilePath);
    }
    var result = __assign({}, nestedRoutes, { path: compile, watch: $match.watch, match: $match, matcher: matcher, normalizedPath: matchPath });
    return result;
}
exports.createRoute = createRoute;
var resolvePathInfo = function (param) {
    if (param instanceof Array) {
        return {
            template: param[0],
            nested: param[1],
            exact: false
        };
    }
    if (typeof param === "string") {
        return {
            template: param,
            nested: {},
            exact: false
        };
    }
    return {
        template: param.path,
        nested: param.nested,
        exact: param.exact
    };
};
