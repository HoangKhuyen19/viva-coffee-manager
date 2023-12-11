import { OrderData } from "../dtos/OrderData";
import IDBHandler from "./IDBHandler";

export default interface IOderDBHandler extends IDBHandler<OrderData>{
    get(id : string) : Promise<OrderData | undefined>
}