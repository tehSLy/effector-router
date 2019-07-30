"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.filter(exists).join("/").replace(slashes, "/");
};
var exists = function (v) { return !!v; };
var slashes = /\/+/g;
