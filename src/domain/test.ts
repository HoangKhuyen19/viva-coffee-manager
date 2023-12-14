import { orderDetailService, orderService, userService } from "./ModelService";
import Order from "./models/Order";
import OrderDetail from "./models/OrderDetail";
import User from "./models/User";

async function test(){
    const path : any[] = [];
    async function getUser(){
        const user : User |undefined = await userService.get("hoangkhuyen",path);
        console.log(user);
    }
    async function getOrder(){
        const order : Order[]= await orderService.getAll(path);
        console.log(order);
    }

    async function getOrderDetail(){
        const orderDetail : OrderDetail[] = await orderDetailService.getAll(path);
        console.log(orderDetail)
    }
    getOrder();
    
}

test();