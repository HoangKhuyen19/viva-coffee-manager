import ProductType from "../models/ProductType";
import IModelService from "./IModelService";

export interface IProductTypeService extends IModelService<ProductType>{
    get(id: string) : Promise<ProductType|undefined>;
}