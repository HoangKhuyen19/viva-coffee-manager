import { OrderDetailData } from "../dtos/OrderDetailData";
import IDBHandler from "./IDBHandler";

export default interface IOderDetailDBHandler extends IDBHandler<OrderDetailData>{
    get(oderId:string, product:string) :Promise<OrderDetailData | undefined>
}