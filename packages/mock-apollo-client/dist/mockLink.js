"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_link_1 = require("apollo-link");
var apollo_utilities_1 = require("apollo-utilities");
var printer_1 = require("graphql/language/printer");
var MockLink = (function (_super) {
    __extends(MockLink, _super);
    function MockLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.requestHandlers = {};
        return _this;
    }
    MockLink.prototype.setRequestHandler = function (requestQuery, handler) {
        var key = requestToKey(requestQuery);
        if (this.requestHandlers[key]) {
            throw new Error("Request handler already defined for query: " + printer_1.print(requestQuery));
        }
        this.requestHandlers[key] = handler;
    };
    MockLink.prototype.request = function (operation) {
        var key = requestToKey(operation.query);
        var handler = this.requestHandlers[key];
        if (!handler) {
            throw new Error("Request handler not defined for query: " + printer_1.print(operation.query));
        }
        var resultPromise = undefined;
        try {
            resultPromise = handler(operation.variables);
        }
        catch (error) {
            throw new Error("Unexpected error whilst calling request handler: " + error.message);
        }
        if (!isPromise(resultPromise)) {
            throw new Error("Request handler must return a promise. Received '" + typeof resultPromise + "'.");
        }
        return new apollo_link_1.Observable(function (observer) {
            resultPromise
                .then(function (result) {
                observer.next(result);
                observer.complete();
            })
                .catch(function (error) {
                observer.error(error);
            });
            return function () { };
        });
    };
    return MockLink;
}(apollo_link_1.ApolloLink));
exports.MockLink = MockLink;
function requestToKey(query) {
    var queryString = query && printer_1.print(query);
    var requestKey = { query: queryString };
    return JSON.stringify(requestKey);
}
function isPromise(maybePromise) {
    return maybePromise && typeof maybePromise.then === 'function';
}
