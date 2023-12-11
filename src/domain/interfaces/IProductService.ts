import Product from "../models/Product";
import IModelService from "./IModelService";

export default interface IProductService extends IModelService<Product>{
    get(id : string) : Promise<Product | undefined>;
}