"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createRouter_1 = require("./createRouter");
var singletonInstance;
exports.getInstance = function () {
    if (!singletonInstance) {
        singletonInstance = createRouter_1.createRouter();
    }
    return singletonInstance;
};
