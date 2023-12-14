"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDBHandler = void 0;
var UserData_1 = require("../dtos/UserData");
var DBHandler_1 = require("./DBHandler");
//CollectionName
var collectionName = "User";
//Pattern
var pattern = UserData_1.userDataPattern;
var UserDBHandler = /** @class */ (function () {
    //Constructor:
    function UserDBHandler() {
    }
    //Methods
    UserDBHandler.prototype.get = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, collection, error_1, document, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, DBHandler_1.accessCollection)(collectionName)];
                    case 1:
                        _a = _b.sent(), connection = _a.connection, collection = _a.collection;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        throw error_1;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.findOne({ username: username })];
                    case 4:
                        document = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _b.sent();
                        connection.close();
                        throw error_2;
                    case 6:
                        //Close connection
                        connection.close();
                        //Document not found
                        if (!document) {
                            return [2 /*return*/];
                        }
                        //Convert document and return
                        return [2 /*return*/, (0, DBHandler_1.convertDocument)(document, pattern)];
                }
            });
        });
    };
    UserDBHandler.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, collection, error_3, documents, error_4, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, DBHandler_1.accessCollection)(collectionName)];
                    case 1:
                        _a = _b.sent(), connection = _a.connection, collection = _a.collection;
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        throw error_3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.find().toArray()];
                    case 4:
                        documents = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _b.sent();
                        connection.close();
                        throw error_4;
                    case 6:
                        //Close connection
                        connection.close();
                        result = [];
                        //Convert documents
                        documents.forEach(function (document) {
                            result.push((0, DBHandler_1.convertDocument)(document, pattern));
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserDBHandler.prototype.getByFilter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, collection, error_5, documents, error_6, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, DBHandler_1.accessCollection)(collectionName)];
                    case 1:
                        _a = _b.sent(), connection = _a.connection, collection = _a.collection;
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        throw error_5;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.find(filter).toArray()];
                    case 4:
                        documents = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _b.sent();
                        connection.close();
                        throw error_6;
                    case 6:
                        //Close connection
                        connection.close();
                        result = [];
                        //Converting documents
                        documents.forEach(function (document) {
                            result.push((0, DBHandler_1.convertDocument)(document, pattern));
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserDBHandler.prototype.insert = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, collection, error_7, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, DBHandler_1.accessCollection)(collectionName)];
                    case 1:
                        _a = _b.sent(), connection = _a.connection, collection = _a.collection;
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        throw error_7;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.insertOne(target)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_8 = _b.sent();
                        connection.close();
                        throw error_8;
                    case 6:
                        //Close connection
                        connection.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDBHandler.prototype.update = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, collection, error_9, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, DBHandler_1.accessCollection)(collectionName)];
                    case 1:
                        _a = _b.sent(), connection = _a.connection, collection = _a.collection;
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _b.sent();
                        throw error_9;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.updateOne({ username: target.username }, { $set: target })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_10 = _b.sent();
                        connection.close();
                        throw error_10;
                    case 6:
                        //Close connection
                        connection.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDBHandler.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, collection, error_11, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, DBHandler_1.accessCollection)(collectionName)];
                    case 1:
                        _a = _b.sent(), connection = _a.connection, collection = _a.collection;
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _b.sent();
                        throw error_11;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.deleteOne({ username: filter })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_12 = _b.sent();
                        connection.close();
                        throw error_12;
                    case 6:
                        //Close connection
                        connection.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserDBHandler;
}());
exports.UserDBHandler = UserDBHandler;
