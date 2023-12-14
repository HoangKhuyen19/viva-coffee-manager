import OrderDetail from "../models/OrderDetail";
import IModelService from "./IModelService";

export default interface IOrderDetailService extends IModelService<OrderDetail>{
    get(orderId: string, product :string , path : any[]) : Promise<OrderDetail | undefined>
}