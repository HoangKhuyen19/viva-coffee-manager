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
var ProductTypeDBHandler_1 = require("../persistent/dbhandlers/ProductTypeDBHandler");
var ProductType_1 = require("./models/ProductType");
var ProductTypeService = /** @class */ (function () {
    //Constructor
    function ProductTypeService(productService) {
        this.productTypeDBHandler = new ProductTypeDBHandler_1.ProductTypeDBHandler();
        this.productService = productService;
    }
    //Methods:
    ProductTypeService.prototype.get = function (id, path) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_1, product, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productTypeDBHandler.get(id)];
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
                        return [4 /*yield*/, this.dataToProductType(data, path)];
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
    ProductTypeService.prototype.getAll = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var datas, error_3, productTypes, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productTypeDBHandler.getAll()];
                    case 1:
                        datas = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw error_3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.multiDataToProductType(datas, path)];
                    case 4:
                        productTypes = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        throw error_4;
                    case 6: 
                    //Return
                    return [2 /*return*/, productTypes];
                }
            });
        });
    };
    ProductTypeService.prototype.getByFilter = function (filter, path) {
        return __awaiter(this, void 0, void 0, function () {
            var datas, error_5, productTypes, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productTypeDBHandler.getByFilter(filter)];
                    case 1:
                        datas = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        throw error_5;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.multiDataToProductType(datas, path)];
                    case 4:
                        productTypes = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        throw error_6;
                    case 6: 
                    //Return
                    return [2 /*return*/, productTypes];
                }
            });
        });
    };
    ProductTypeService.prototype.insert = function (productType) {
        return __awaiter(this, void 0, void 0, function () {
            var productTypeData, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productTypeData = this.productTypeToData(productType);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productTypeDBHandler.insert(productTypeData)];
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
    ProductTypeService.prototype.update = function (productType) {
        return __awaiter(this, void 0, void 0, function () {
            var productTypeData, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productTypeData = this.productTypeToData(productType);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productTypeDBHandler.update(productTypeData)];
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
    ProductTypeService.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productTypeDBHandler.delete(filter)];
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
    ProductTypeService.prototype.productTypeToData = function (productType) {
        return {
            id: productType.Id,
            name: productType.Name,
        };
    };
    ProductTypeService.prototype.dataToProductType = function (data, path) {
        return __awaiter(this, void 0, void 0, function () {
            //Local function
            function precheck(id, path) {
                for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                    var obj = path_1[_i];
                    if (obj instanceof ProductType_1.default) {
                        if (obj.Id === id) {
                            return obj;
                        }
                    }
                }
            }
            function getProducts(id, productT, path) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, error_11;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!seft.productService) return [3 /*break*/, 4];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                _a = productT;
                                return [4 /*yield*/, seft.productService.getByFilter({ type: id }, path)];
                            case 2:
                                _a.Products = _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                error_11 = _b.sent();
                                throw error_11;
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }
            var seft, productType, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seft = this;
                        //ProductType precheck
                        productType = precheck(data.id, path);
                        //Return if found in path
                        if (productType) {
                            return [2 /*return*/, productType];
                        }
                        //Try converting if not found in path
                        productType = new ProductType_1.default();
                        //Copy fields:
                        productType.Id = data.id;
                        productType.Name = data.name;
                        //Path pushing
                        path.push(productType);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, getProducts(data.id, productType, path)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _a.sent();
                        throw error_10;
                    case 4: 
                    //Return product
                    return [2 /*return*/, productType];
                }
            });
        });
    };
    ProductTypeService.prototype.multiDataToProductType = function (datas, path) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, datas_1, data, _a, _b, error_12;
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
                        return [4 /*yield*/, this.dataToProductType(data, path)];
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
                    case 7: 
                    //Return
                    return [2 /*return*/, result];
                }
            });
        });
    };
    Object.defineProperty(ProductTypeService.prototype, "ProductService", {
        //Getter setter
        get: function () {
            return this.productService;
        },
        set: function (productService) {
            this.productService = productService;
        },
        enumerable: false,
        configurable: true
    });
    return ProductTypeService;
}());
exports.default = ProductTypeService;
