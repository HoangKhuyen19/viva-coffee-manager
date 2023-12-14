import Product from "../models/Product";
import IModelService from "./IModelService";

export default interface IProductService extends IModelService<Product>{
    get(id : string, path : any[]) : Promise<Product | undefined>;
}