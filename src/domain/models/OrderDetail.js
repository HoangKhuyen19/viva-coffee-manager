"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderDetail = /** @class */ (function () {
    //Constructor
    function OrderDetail(orderId, product, amount, totalPrice) {
        this.orderId = orderId;
        this.product = product;
        this.amount = amount;
        this.totalPrice = totalPrice;
    }
    //Methods:
    OrderDetail.prototype.totalPriceCalculate = function () {
        if (this.amount && this.product && this.product.Price) {
            return this.amount * this.product.Price;
        }
        else {
            return 0;
        }
    };
    Object.defineProperty(OrderDetail.prototype, "OrderId", {
        //Getter setter
        get: function () {
            return this.orderId;
        },
        set: function (orderId) {
            this.orderId = orderId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrderDetail.prototype, "Product", {
        get: function () {
            return this.product;
        },
        set: function (product) {
            this.product = product;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrderDetail.prototype, "Amount", {
        get: function () {
            return this.amount;
        },
        set: function (amount) {
            this.amount = amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrderDetail.prototype, "TotalPrice", {
        get: function () {
            return this.totalPrice;
        },
        set: function (totalPrice) {
            this.totalPrice = totalPrice;
        },
        enumerable: false,
        configurable: true
    });
    return OrderDetail;
}());
exports.default = OrderDetail;
