"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReactPrefetch = exports.ReactPrefetchProvider = void 0;
var React = require("react");
var axios_1 = require("axios");
var ReactPrefetchContext = React.createContext(undefined);
var ReactPrefetchProvider = function (_a) {
    var children = _a.children;
    var PromiseRef = React.useRef([]);
    var prefetch = function (url, options) {
        if (options === void 0) { options = {}; }
        var newData = PromiseRef.current.find(function (data) { return data.url === url; });
        if (newData) {
            return;
        }
        var promise = axios_1.default.get(url, options);
        var data = __spreadArrays(PromiseRef.current, [{ url: url, value: promise }]);
        PromiseRef.current = data;
    };
    var fetchData = function (url, options) {
        if (options === void 0) { options = {}; }
        var test1 = PromiseRef.current.find(function (data) { return data.url === url; });
        if (test1) {
            if (test1.value instanceof Promise) {
                return test1.value;
            }
        }
        return new Promise(function (resolve, reject) {
            var newData = PromiseRef.current.find(function (data) { return data.url === url; });
            if (newData) {
                resolve(newData.value);
                var data_1 = PromiseRef.current.filter(function (d) { return d.url !== url; });
                PromiseRef.current = data_1;
            }
            else {
                axios_1.default
                    .get(url)
                    .then(function (res) {
                    resolve(res);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }
        });
    };
    var data = [PromiseRef.current, prefetch, fetchData];
    return (React.createElement(ReactPrefetchContext.Provider, { value: data }, children));
};
exports.ReactPrefetchProvider = ReactPrefetchProvider;
var useReactPrefetch = function () {
    var context = React.useContext(ReactPrefetchContext);
    if (context === undefined) {
        throw new Error("useReactPrefetch can only be used inside ReactPrefetchProvider");
    }
    var PromiseRef = context[0], prefetch = context[1], fetchData = context[2];
    React.useEffect(function () {
        return function () {
            return (PromiseRef.current = []);
        };
    }, []);
    return { prefetch: prefetch, fetchData: fetchData };
};
exports.useReactPrefetch = useReactPrefetch;
//# sourceMappingURL=index.js.map