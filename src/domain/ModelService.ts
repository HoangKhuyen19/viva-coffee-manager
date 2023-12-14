import OrderDetailService from "./OrderDetailService";
import OrderService from "./OrderService";
import ProductService from "./ProductService";
import ProductTypeService from "./ProductTypeService";
import UserService from "./UserService";

export const productService : ProductService = new ProductService();
export const productTypeService : ProductTypeService = new ProductTypeService();
export const orderService : OrderService = new OrderService();
export const orderDetailService : OrderDetailService = new OrderDetailService();
export const userService : UserService = new UserService();

productService.ProductTypeService = productTypeService;

productTypeService.ProductService = productService;

orderService.OrderDetailService = orderDetailService;
orderService.UserService = userService;

orderDetailService.OrderService = orderService;
orderDetailService.ProductService = productService;

userService.OrderService = orderService;