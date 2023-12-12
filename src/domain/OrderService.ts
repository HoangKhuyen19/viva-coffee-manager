import IOderDBHandler from "../persistent/interfaces/IOrderDBHandler";
import IOderService from "./interfaces/IOrderService";
import Order from "./models/Order";
import { OrderData } from "../persistent/dtos/OrderData";
import IOrderDetailService from "./interfaces/IOrderDetailService";
import { OrderDBHandler } from "../persistent/dbhandlers/OrderDBHandler";
import IUserService from "./interfaces/IUserService";

export default class OrderService implements IOderService {
    //fields:
    private orderDBHandler: IOderDBHandler;
    private orderDetailService?: IOrderDetailService;
    private userService?: IUserService;

    //Constructor
    public constructor(userService?: IUserService,orderDetailService?: IOrderDetailService, ) {
        this.orderDBHandler = new OrderDBHandler();
        this.userService = userService;
        this.orderDetailService = orderDetailService;
    }

    //Methods
    async get(id: string): Promise<Order | undefined> {
        //Try getting data
        try {
            var data : OrderData|undefined= await this.orderDBHandler.get(id);
        } catch (error) {
            throw error;
        }
        
        //Data not found
        if(!data){
            return;
        }

        //Try converting data
        try {
            var order: Order|undefined = await this.dataToOrder(data);
        } catch (error) {
            throw error;
        }

        return order;
    }   
    async getAll(): Promise<Order[]> {
        //Try getting datas
        try {
            var datas : OrderData[] = await this.orderDBHandler.getAll();
        } catch (error) {
            throw error;
        }

        //Try converting datas
        try {
            var orders : Order[] = await this.multiDataToOrder(datas);
        } catch (error) {
            throw error;
        }

        return orders;
    }
    async getByFilter(filter: any): Promise<Order[]> {
        //Try getting datas
        try {
            var datas : OrderData[] = await this.orderDBHandler.getByFilter(filter);
        } catch (error) {
            throw error;
        }

        //Try converting datas
        try {
            var orders : Order[] = await this.multiDataToOrder(datas);
        } catch (error) {
            throw error;
        }

        return orders;
    }
    async insert(order: Order): Promise<void> {
        //Convert data
        var data: OrderData = this.orderToData(order);

        //Try inserting
        try {
            await this.orderDBHandler.insert(data);
        } catch (error) {
            throw error;
        }
    }
    async update(order: Order): Promise<void> {
        //Convert data
        var data: OrderData = this.orderToData(order);

        //Try updating
        try {
            await this.orderDBHandler.update(data);
        } catch (error) {
            throw error;
        }
    }
    async delete(filter: any): Promise<void> {
        //Try deleting
        try {
            await this.orderDBHandler.delete(filter);
        } catch (error) {
            throw error;
        }
    }

    //Local methods   
    private orderToData(order: Order): OrderData {
        return {
            id: order.Id as string,
            date: order.Date as Date,
            totalPrice: order.TotalPrice as number,
            createdBy: order.CreateBy?.Username
        }
    }

    private async dataToOrder(data: OrderData): Promise<Order> {
        const seft: OrderService = this;

        //Fuction get order deatail list
        async function getOrderDetails(id: string, order: Order): Promise<void> {
            if (seft.orderDetailService) {

                try {
                    order.OrderDetails = await seft.orderDetailService.getByFilter({ orderId: id })
                } catch (error) {
                    throw error;
                }
            }
        }

        //Function get createdBy
        async function getUser(id:string, order: Order): Promise<void>{
            if(seft.userService){
                try {
                    order.CreateBy = await seft.userService.get(id);
                } catch (error) {
                    throw error;
                }
            }
        }

        let order : Order =  new Order();

        //Copy fields:
        order.Id = data.id;
        order.Date = data.date;
        order.TotalPrice = data.totalPrice

        //Get order detail list and created by
        try {
            //Created By
            if(data.createdBy){
                await getUser(data.createdBy, order);
            }

            //Order detail list
            await getOrderDetails(data.id,order);
        } catch (error) {
            throw error;
        }

        //Return order
        return order;
    }

    private async multiDataToOrder(datas : OrderData[]) : Promise<Order[]>{
        const result : Order[] = [];

        //Try converting 
        try {
            for(const data of datas){
                result.push(await this.dataToOrder(data));
            }
        } catch (error) {
            throw error;
        }
        //Return
        return result;
    }

    //Getter setter
    public get OrderDetailService(): IOrderDetailService|undefined{
        return this.orderDetailService;
    }

    public set OrderDetailService(orderDetailService: IOrderDetailService|undefined){
        this.orderDetailService = orderDetailService;
    }

    public get UserService(): IUserService|undefined{
        return this.userService;
    }

    public set UserService(userService: IUserService|undefined){
        this.userService = userService;
    }
}