"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var effector_1 = require("effector");
function sampleTo(source, fn, target) {
    var clock = effector_1.createEvent();
    effector_1.sample({ target: target, clock: clock, source: source, fn: fn });
    return clock;
}
exports.sampleTo = sampleTo;
