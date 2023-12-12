import IOderDetailDBHandler from "../persistent/interfaces/IOderDetailDBHandler";
import IOrderDetailService from "./interfaces/IOrderDetailService";
import OrderDetail from "./models/OrderDetail";
import { OrderDetailDBHandler } from "../persistent/dbhandlers/OrderDetailDBHandler";
import IOrderService from "./interfaces/IOrderService";
import { OrderDetailData } from "../persistent/dtos/OrderDetailData";
import IProductService from "./interfaces/IProductService";

export default class OrderDetailService implements IOrderDetailService{
    //Fields:
    private orderDetailDBHandler : IOderDetailDBHandler;
    private orderService?: IOrderService;
    private productService?: IProductService;
    //Constructor:
    public constructor(orderService?: IOrderService, productService?: IProductService) {
        this.orderDetailDBHandler = new OrderDetailDBHandler();
        this.orderService = orderService;
        this.productService = productService;
    }

    async get(orderId: string, product: string): Promise<OrderDetail|undefined> {
        //Try getting data  
        try {
            var data : OrderDetailData | undefined = await this.orderDetailDBHandler.get(orderId, product);
        } catch (error) {
            throw error;
        }

        //Data not found
        if (!data) {
            return;
        }

        //Try converting data
        try {
            var orderDetail: OrderDetail = await this.dataToOrderDetail(data);
        } catch (error) {
            throw error;
        }

        //Return
        return orderDetail;
    }
    async getAll(): Promise<OrderDetail[]> {
        //try getting datas
        try {
            var datas : OrderDetailData[] = await this.orderDetailDBHandler.getAll();
        }catch(error) {
            throw error;
        }

        //Try converting
        try {
            var orderDetails : OrderDetail[] = await this.multiDataToOrderDetail(datas);
        }catch(error) {
            throw error;
        }

        //Return
        return orderDetails;
    }
    async getByFilter(filter: any): Promise<OrderDetail[]> {
        //Try getting datas
        try {
            var datas : OrderDetailData[] = await this.orderDetailDBHandler.getByFilter(filter);
        }catch(error) {
            throw error;
        }

        //Try converting
        try {
            var orderDetails : OrderDetail[] = await this.multiDataToOrderDetail(datas);
        }catch(error) {
            throw error;
        }

        //Return
        return orderDetails;
    }
    async insert(target: OrderDetail): Promise<void> {
        //Try converting
        const data : OrderDetailData = await this.orderDetailToData(target);
        
        //Try inserting
        try {
            await this.orderDetailDBHandler.insert(data);
        } catch (error) {
            throw error;
        }
    }
    async update(target: OrderDetail): Promise<void> {
        //Try converting
        const data: OrderDetailData = await this.orderDetailToData(target);

        //Try updating
        try {
            await this.orderDetailDBHandler.update(data);
        } catch (error) {
            throw error;
        }
    }
    async delete(filter: any): Promise<void> {
        //Try deleting
        try {
            await this.orderDetailDBHandler.delete(filter);
        } catch (error) {
            throw error;
        }
    }

    //Local methods
    private async dataToOrderDetail(data: OrderDetailData): Promise<OrderDetail> {
        const seft : OrderDetailService = this;

        const orderDetail: OrderDetail = new OrderDetail();

        //Function 
        async function getOrder(id: string, orderDetail: OrderDetail): Promise<void> {
            if (seft.orderService) {
                try {
                    orderDetail.OrderId = await seft.orderService.get(id);
                } catch (error) {
                    throw error;
                }
            }
        }

        async function  getProduct(id: string, orderDetail: OrderDetail): Promise<void> {
            if (seft.productService) {
                try {
                    orderDetail.Product = await seft.productService.get(id);
                } catch (error) {
                    throw error;
                }
            }
        }

        //copy files:
        orderDetail.Amount = data.amount;
        orderDetail.TotalPrice = data.totalPrice;
        
        try {
            await getOrder(data.orderId, orderDetail);
            await getProduct(data.product, orderDetail);    
        } catch (error) {
            throw error;
        }
        
        //Return
        return orderDetail
    }

    private async multiDataToOrderDetail(datas: OrderDetailData[]): Promise<OrderDetail[]> {
        const result: OrderDetail[] = [];

        //Try converting
        try {
            for (const data of datas) {
                result.push(await this.dataToOrderDetail(data));
            }
        }catch (error) {
            throw error;
        }

        //Return
        return result;
    }

    private orderDetailToData(orderDetail: OrderDetail): OrderDetailData {
        return {
            orderId: orderDetail.OrderId?.Id as string,
            product: orderDetail.Product?.Id as string,
            amount: orderDetail.Amount as number,
            totalPrice: orderDetail.TotalPrice as number
        }
    }

    //Getter setter
    public get OrderService(): IOrderService|undefined {
        return this.orderService;
    }

    public set OrderService(orderService: IOrderService|undefined) {
        this.orderService = orderService;
    }

    public get ProductService(): IProductService|undefined {
        return this.productService;
    }

    public set ProductService(productService: IProductService|undefined) {
        this.productService = productService;
    }
}