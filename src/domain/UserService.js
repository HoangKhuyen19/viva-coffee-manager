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
exports.UserService = void 0;
var User_1 = require("./models/User");
var UserDBHandler_1 = require("../persistent/dbhandlers/UserDBHandler");
var UserService = /** @class */ (function () {
    //Constructor
    function UserService(orderService) {
        this.userDBHandler = new UserDBHandler_1.UserDBHandler();
        this.orderService = orderService;
    }
    UserService.prototype.getByFilter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var usersData, error_1, users, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userDBHandler.getByFilter(filter)];
                    case 1:
                        usersData = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.multiDataToUser(usersData)];
                    case 4:
                        users = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        throw error_2;
                    case 6: 
                    //Return
                    return [2 /*return*/, users];
                }
            });
        });
    };
    //Methods:
    UserService.prototype.get = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_3, user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userDBHandler.get(username)];
                    case 1:
                        userData = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw error_3;
                    case 3:
                        //User data not found
                        if (!userData) {
                            return [2 /*return*/];
                        }
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.dataToUser(userData)];
                    case 5:
                        user = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        throw error_4;
                    case 7: 
                    //Return
                    return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersData, error_5, users, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userDBHandler.getAll()];
                    case 1:
                        usersData = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        throw error_5;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.multiDataToUser(usersData)];
                    case 4:
                        users = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        throw error_6;
                    case 6: 
                    //Return
                    return [2 /*return*/, users];
                }
            });
        });
    };
    UserService.prototype.insert = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = this.userToData(user);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userDBHandler.insert(userData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        throw error_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.update = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = this.userToData(user);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userDBHandler.update(userData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _a.sent();
                        throw error_8;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.delete = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userDBHandler.delete(username)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        throw error_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Local methods
    UserService.prototype.userToData = function (user) {
        return {
            username: user.Username,
            password: user.Password,
            fullName: user.FullName,
            permission: user.Permission
        };
    };
    UserService.prototype.dataToUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            function getOrders(username, user) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, error_11;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!seft.orderService) return [3 /*break*/, 4];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                _a = user;
                                return [4 /*yield*/, seft.orderService.getByFilter({ createdBy: username })];
                            case 2:
                                _a.Orders = _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                error_11 = _b.sent();
                                throw error_11;
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }
            var seft, user, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seft = this;
                        user = new User_1.default();
                        //Copy fields:
                        user.Username = data.username;
                        user.Password = data.password;
                        user.FullName = data.fullName;
                        user.Permission = data.permission;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, getOrders(data.username, user)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _a.sent();
                        throw error_10;
                    case 4: 
                    //Return:
                    return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.multiDataToUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, data_1, UserData, _a, _b, error_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        result = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        _i = 0, data_1 = data;
                        _c.label = 2;
                    case 2:
                        if (!(_i < data_1.length)) return [3 /*break*/, 5];
                        UserData = data_1[_i];
                        _b = (_a = result).push;
                        return [4 /*yield*/, this.dataToUser(UserData)];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_12 = _c.sent();
                        throw error_12;
                    case 7: return [2 /*return*/, result];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
