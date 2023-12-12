"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    //Constructor
    function User(username, password, fullName, permission, orders) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.permission = permission;
        this.orders = (orders || []);
    }
    Object.defineProperty(User.prototype, "Username", {
        //Methods:
        get: function () {
            return this.username;
        },
        set: function (username) {
            this.username = username;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Password", {
        get: function () {
            return this.password;
        },
        set: function (password) {
            this.password = password;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "FullName", {
        get: function () {
            return this.fullName;
        },
        set: function (fullName) {
            this.fullName = fullName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Permission", {
        get: function () {
            return this.permission;
        },
        set: function (permission) {
            this.permission = permission;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Orders", {
        get: function () {
            return this.orders;
        },
        set: function (orders) {
            this.orders = orders;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
exports.default = User;
