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
Object.defineProperty(exports, "__esModule", { value: true });
var history_1 = require("history");
var effector_1 = require("effector");
var sampleTo_1 = require("./sampleTo");
var createMatcher_1 = require("./createMatcher");
exports.createRouter = function (history) {
    if (history === void 0) { history = history_1.createBrowserHistory(); }
    var historyChanged = effector_1.createEvent();
    history.listen(function (location, action) { return historyChanged({ action: action, location: location }); });
    var locationChanged = historyChanged.map(function (_a) {
        var location = _a.location;
        return location;
    });
    var pathChanged = locationChanged.map(function (_a) {
        var pathname = _a.pathname;
        return pathname;
    });
    var location = effector_1.restore(locationChanged, history.location);
    var path = location.map(function (_a) {
        var pathname = _a.pathname;
        return pathname;
    });
    var pushLocation = effector_1.createEvent();
    pushLocation.watch(history.push);
    var pushPath = sampleTo_1.sampleTo(location, function (location, pathname) { return (__assign({}, location, { pathname: pathname })); }, pushLocation);
    var pushSearch = sampleTo_1.sampleTo(location, function (location, search) { return (__assign({}, location, { search: search })); }, pushLocation);
    var match = function (template) {
        var matcher = createMatcher_1.createMatcher(template);
        return path.map(matcher);
    };
    return {
        location: location,
        pushPath: pushPath,
        pushSearch: pushSearch,
        match: match,
        history: history,
        path: path
    };
};
