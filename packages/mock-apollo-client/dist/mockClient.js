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
var apollo_client_1 = __importDefault(require("apollo-client"));
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var mockLink_1 = require("./mockLink");
exports.createMockClient = function (options) {
    var _a;
    if ((_a = options) === null || _a === void 0 ? void 0 : _a.link) {
        throw new Error('Providing link to use is not supported.');
    }
    var mockLink = new mockLink_1.MockLink();
    var client = new apollo_client_1.default(__assign(__assign({ cache: new apollo_cache_inmemory_1.InMemoryCache({
            addTypename: false,
        }) }, options), { link: mockLink }));
    var mockMethods = {
        setRequestHandler: mockLink.setRequestHandler.bind(mockLink),
    };
    return Object.assign(client, mockMethods);
};
