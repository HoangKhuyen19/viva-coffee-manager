import Order from "../models/Order";
import IModelService from "./IModelService";

export default interface IOderService extends IModelService<Order>{
    get(id:string) : Promise<Order|undefined>
}