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
var ProductDBHandler_1 = require("../persistent/dbhandlers/ProductDBHandler");
var Product_1 = require("./models/Product");
var ProductService = /** @class */ (function () {
    //Constructor
    function ProductService(productTypeService) {
        this.productDBHandler = new ProductDBHandler_1.ProductDBHandler();
        this.productTypeService = productTypeService;
    }
    //Methods:
    ProductService.prototype.get = function (id, path) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_1, product, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productDBHandler.get(id)];
                    case 1:
                        data = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3:
                        //Data not found
                        if (!data) {
                            return [2 /*return*/];
                        }
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.dataToProduct(data, path)];
                    case 5:
                        product = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        throw error_2;
                    case 7: 
                    //Return
                    return [2 /*return*/, product];
                }
            });
        });
    };
    ProductService.prototype.getAll = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var datas, error_3, products, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productDBHandler.getAll()];
                    case 1:
                        datas = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw error_3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.multiDataToProduct(datas, path)];
                    case 4:
                        products = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        throw error_4;
                    case 6: 
                    //Return
                    return [2 /*return*/, products];
                }
            });
        });
    };
    ProductService.prototype.getByFilter = function (filter, path) {
        return __awaiter(this, void 0, void 0, function () {
            var datas, error_5, products, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productDBHandler.getByFilter(filter)];
                    case 1:
                        datas = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        throw error_5;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.multiDataToProduct(datas, path)];
                    case 4:
                        products = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        throw error_6;
                    case 6: 
                    //Return
                    return [2 /*return*/, products];
                }
            });
        });
    };
    ProductService.prototype.insert = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var productData, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productData = this.productToData(product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productDBHandler.insert(productData)];
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
    ProductService.prototype.update = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var productData, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productData = this.productToData(product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productDBHandler.update(productData)];
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
    ProductService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productDBHandler.delete(filter)];
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
    //Local methods:
    ProductService.prototype.productToData = function (product) {
        return {
            id: product.Id,
            name: product.Name,
            type: (product.Type ? product.Type.Id : undefined),
            price: product.Price,
            description: product.Description
        };
    };
    ProductService.prototype.dataToProduct = function (data, path) {
        return __awaiter(this, void 0, void 0, function () {
            //Local function:
            function precheck(id, path) {
                for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                    var obj = path_1[_i];
                    if (obj instanceof Product_1.default) {
                        if (obj.Id === id) {
                            return obj;
                        }
                    }
                }
            }
            function getProductType(id, product, path) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, error_10;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                if (!seft.productTypeService) return [3 /*break*/, 2];
                                _a = product;
                                return [4 /*yield*/, seft.productTypeService.get(id, path)];
                            case 1:
                                _a.Type = _b.sent();
                                _b.label = 2;
                            case 2: return [3 /*break*/, 4];
                            case 3:
                                error_10 = _b.sent();
                                throw error_10;
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }
            var seft, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seft = this;
                        //Product precheck
                        product = precheck(data.id, path);
                        //Return if found product in path
                        if (product) {
                            return [2 /*return*/, product];
                        }
                        //Try converting if not found in path
                        product = new Product_1.default();
                        //Copy fields:
                        product.Id = data.id;
                        product.Name = data.name;
                        product.Price = data.price;
                        product.Description = data.description;
                        //Path pushing
                        path.push(product);
                        if (!data.type) return [3 /*break*/, 2];
                        return [4 /*yield*/, getProductType(data.type, product, path)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: 
                    //Return product
                    return [2 /*return*/, product];
                }
            });
        });
    };
    ProductService.prototype.multiDataToProduct = function (datas, path) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, datas_1, data, _a, _b, error_11;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        result = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        _i = 0, datas_1 = datas;
                        _c.label = 2;
                    case 2:
                        if (!(_i < datas_1.length)) return [3 /*break*/, 5];
                        data = datas_1[_i];
                        _b = (_a = result).push;
                        return [4 /*yield*/, this.dataToProduct(data, path)];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_11 = _c.sent();
                        throw error_11;
                    case 7: 
                    //Return
                    return [2 /*return*/, result];
                }
            });
        });
    };
    Object.defineProperty(ProductService.prototype, "ProductTypeService", {
        //Getter setter
        get: function () {
            return this.productTypeService;
        },
        set: function (productTypeService) {
            this.productTypeService = productTypeService;
        },
        enumerable: false,
        configurable: true
    });
    return ProductService;
}());
exports.default = ProductService;
