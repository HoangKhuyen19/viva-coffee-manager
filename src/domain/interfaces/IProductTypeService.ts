import ProductType from "../models/ProductType";
import IModelService from "./IModelService";

export default interface IProductTypeService extends IModelService<ProductType>{
    get(id: string, path :any[]) : Promise<ProductType|undefined>;
}