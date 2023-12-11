import { ProductData } from "../dtos/ProductData";
import IDBHandler from "./IDBHandler";

export default interface IProductDBHandler extends IDBHandler<ProductData>{
    get(id: string) : Promise<ProductData | undefined>
}