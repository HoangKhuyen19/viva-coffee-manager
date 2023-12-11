"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductType = /** @class */ (function () {
    //Constructor:
    function ProductType(id, name, products) {
        this.id = id;
        this.name = name;
        this.products = (products || []);
    }
    Object.defineProperty(ProductType.prototype, "Id", {
        //Mehthods:
        get: function () {
            return this.id;
        },
        set: function (id) {
            this.id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductType.prototype, "Name", {
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductType.prototype, "Products", {
        get: function () {
            return this.products;
        },
        set: function (products) {
            this.products = products;
        },
        enumerable: false,
        configurable: true
    });
    return ProductType;
}());
exports.default = ProductType;
