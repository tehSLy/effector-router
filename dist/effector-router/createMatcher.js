"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_to_regexp_1 = __importDefault(require("path-to-regexp"));
exports.createMatcher = function (template, keys) {
    if (keys === void 0) { keys = []; }
    var regexp = path_to_regexp_1.default(template, keys);
    return function (path) {
        var result = regexp.exec(path);
        var matched = result !== null;
        var paramsResult = result ? result.splice(1, result.length - 1) : null;
        var params = paramsResult
            ? keys.reduce(function (carry, key, idx) { return ((carry[key.name] = paramsResult[idx]), carry); }, {})
            : null;
        return { matched: matched, params: params };
    };
};
