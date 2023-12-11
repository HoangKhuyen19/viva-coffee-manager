import { ProductTypeData } from "../dtos/ProductTypeData";
import IDBHandler from "./IDBHandler";

export default interface IProductTypeDBHandler extends IDBHandler<ProductTypeData>{
    get(id:string) : Promise<ProductTypeData | undefined>
}