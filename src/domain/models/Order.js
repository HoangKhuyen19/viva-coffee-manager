"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order = /** @class */ (function () {
    //Constructor:
    function Order(id, date, totalPrice, createdBy, orderDetails) {
        this.id = id;
        this.date = date;
        this.totalPrice = totalPrice;
        this.createdBy = createdBy;
        this.orderDetails = (orderDetails || []);
    }
    //Methods:
    Order.prototype.toltalPriceCalculate = function (orderDetails) {
        var toltal = 0;
        for (var _i = 0, orderDetails_1 = orderDetails; _i < orderDetails_1.length; _i++) {
            var orderDetail = orderDetails_1[_i];
            toltal += orderDetail.totalPriceCalculate();
        }
        return toltal;
    };
    Object.defineProperty(Order.prototype, "Id", {
        //Getter setter
        get: function () {
            return this.id;
        },
        set: function (id) {
            this.id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "Date", {
        get: function () {
            return this.date;
        },
        set: function (date) {
            this.date = date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "TotalPrice", {
        get: function () {
            return this.totalPrice;
        },
        set: function (totalPrice) {
            this.totalPrice = totalPrice;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "CreateBy", {
        get: function () {
            return this.createdBy;
        },
        set: function (createdBy) {
            this.createdBy = createdBy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "OrderDetails", {
        get: function () {
            return this.orderDetails;
        },
        set: function (orderDetails) {
            this.orderDetails = orderDetails;
        },
        enumerable: false,
        configurable: true
    });
    return Order;
}());
exports.default = Order;
