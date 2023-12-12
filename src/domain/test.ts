import OrderDetailService from "./OrderDetailService";
import OrderService from "./OrderService";
import { ProductService } from "./ProductService";
import { ProductTypeService } from "./ProductTypeService";
import { UserService } from "./UserService";
import IProductService from "./interfaces/IProductService";
import { IProductTypeService } from "./interfaces/IProductTypeService";
import Order from "./models/Order";
import OrderDetail from "./models/OrderDetail";
import Product from "./models/Product";
import ProductType from "./models/ProductType";
import User from "./models/User";

async function test(){
    const proType2: IProductTypeService = new ProductTypeService();
    const pro: IProductService = new ProductService(proType2);
    const proType: IProductTypeService = new ProductTypeService(pro);

    // var proTypes : ProductType[] = await proType.getAll();
    // var pro222: Product[]  = await pro.getAll();
    // console.log(proTypes,pro222);
    var product: Product[] = await pro.getByFilter({type:"CF"});
    var proty : ProductType[] = await proType.getByFilter({id:"CF"})
    console.log(proty,product);
}

async function testOrder(){
    //UserService
    const userService: UserService  = new UserService();

    //Product Service
    const productService: ProductService = new ProductService();

    //OrderService
    const orderServiceTest: OrderService = new OrderService();

    //OrderDetailService
    const orderDetailService : OrderDetailService = new OrderDetailService(orderServiceTest,productService);

    //OrderService
    const orderService: OrderService = new OrderService(userService,orderDetailService);
    
    async function insertOrder(){
        const order: Order = new Order();
        order.Id = "121220230001";
        order.Date = new Date();
        order.TotalPrice = 1000;
        try {
            var user : User | undefined = await userService.get("hoangkhuyen");
        } catch (error) {
            throw error;
        }
    
        if(user){
            order.CreateBy = user;
        }
    
        try {
            await orderService.insert(order);
            console.log("Insert success");
        } catch (error) {
            console.log("Insert error");
            throw error;
        }
    }

    async function insertOrderDetail(){
        var orderDetail : OrderDetail = new OrderDetail();
        //get order
        try {
            var order : Order | undefined = await orderService.get("121220230001");
        } catch (error) {
            throw error;
        }

        //Get Product
        try {
            var product: Product | undefined = await productService.get("CF01");
        }catch(error){
            throw error;
        }

        orderDetail.OrderId = order
        orderDetail.Product = product;
        orderDetail.Amount = 1;
        orderDetail.TotalPrice = 20000;
        
        try {
            await orderDetailService.insert(orderDetail);
            console.log("Insert success");
        } catch (error) {
            throw error
        }
    }

    async function getOrder() : Promise<Order | undefined>{
        try {
            var order : Order | undefined = await orderService.get("121220230001");
        } catch (error) {
            throw error;
        }

        return order;
    }
    async function updateUser(){

        try {
            var user : User | undefined = await userService.get("hoangkhuyen");
        } catch (error) {
            throw error;
        }
        try {
            var order: Order | undefined = await orderService.get("121220230001");
        } catch (error) {
            throw error;
        }
        
        if(!user){
            return;
        }

        if(!order){
            return;
        }
        user.Orders.push(order);
        try {
            await userService.update(user);
        } catch (error) {
            throw error;
        }
    }
    getOrder();
}


testOrder();