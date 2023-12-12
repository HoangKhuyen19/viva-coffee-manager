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
var OrderDetailService_1 = require("./OrderDetailService");
var OrderService_1 = require("./OrderService");
var ProductService_1 = require("./ProductService");
var ProductTypeService_1 = require("./ProductTypeService");
var UserService_1 = require("./UserService");
var Order_1 = require("./models/Order");
var OrderDetail_1 = require("./models/OrderDetail");
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var proType2, pro, proType, product, proty;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    proType2 = new ProductTypeService_1.ProductTypeService();
                    pro = new ProductService_1.ProductService(proType2);
                    proType = new ProductTypeService_1.ProductTypeService(pro);
                    return [4 /*yield*/, pro.getByFilter({ type: "CF" })];
                case 1:
                    product = _a.sent();
                    return [4 /*yield*/, proType.getByFilter({ id: "CF" })];
                case 2:
                    proty = _a.sent();
                    console.log(proty, product);
                    return [2 /*return*/];
            }
        });
    });
}
function testOrder() {
    return __awaiter(this, void 0, void 0, function () {
        function insertOrder() {
            return __awaiter(this, void 0, void 0, function () {
                var order, user, error_1, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            order = new Order_1.default();
                            order.Id = "121220230001";
                            order.Date = new Date();
                            order.TotalPrice = 1000;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, userService.get("hoangkhuyen")];
                        case 2:
                            user = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            throw error_1;
                        case 4:
                            if (user) {
                                order.CreateBy = user;
                            }
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, orderService.insert(order)];
                        case 6:
                            _a.sent();
                            console.log("Insert success");
                            return [3 /*break*/, 8];
                        case 7:
                            error_2 = _a.sent();
                            console.log("Insert error");
                            throw error_2;
                        case 8: return [2 /*return*/];
                    }
                });
            });
        }
        function insertOrderDetail() {
            return __awaiter(this, void 0, void 0, function () {
                var orderDetail, order, error_3, product, error_4, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            orderDetail = new OrderDetail_1.default();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, orderService.get("121220230001")];
                        case 2:
                            order = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            throw error_3;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, productService.get("CF01")];
                        case 5:
                            product = _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            error_4 = _a.sent();
                            throw error_4;
                        case 7:
                            orderDetail.OrderId = order;
                            orderDetail.Product = product;
                            orderDetail.Amount = 1;
                            orderDetail.TotalPrice = 20000;
                            _a.label = 8;
                        case 8:
                            _a.trys.push([8, 10, , 11]);
                            return [4 /*yield*/, orderDetailService.insert(orderDetail)];
                        case 9:
                            _a.sent();
                            console.log("Insert success");
                            return [3 /*break*/, 11];
                        case 10:
                            error_5 = _a.sent();
                            throw error_5;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        }
        function getOrder() {
            return __awaiter(this, void 0, void 0, function () {
                var order, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, orderService.get("121220230001")];
                        case 1:
                            order = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _a.sent();
                            throw error_6;
                        case 3:
                            if (order) {
                                console.log(order);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        var userService, productService, orderServiceTest, orderDetailService, orderService;
        return __generator(this, function (_a) {
            userService = new UserService_1.UserService();
            productService = new ProductService_1.ProductService();
            orderServiceTest = new OrderService_1.default();
            orderDetailService = new OrderDetailService_1.default(orderServiceTest, productService);
            orderService = new OrderService_1.default(userService, orderDetailService);
            getOrder();
            return [2 /*return*/];
        });
    });
}
testOrder();
