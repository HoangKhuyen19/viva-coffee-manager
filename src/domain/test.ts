import { ProductService } from "./ProductService";
import { ProductTypeService } from "./ProductTypeService";
import IProductService from "./interfaces/IProductService";
import { IProductTypeService } from "./interfaces/IProductTypeService";
import Product from "./models/Product";
import ProductType from "./models/ProductType";

async function test(){
    const proType2: IProductTypeService = new ProductTypeService();
    const pro: IProductService = new ProductService(proType2);
    const proType: IProductTypeService = new ProductTypeService(pro);

    // var proTypes : ProductType[] = await proType.getAll();
    // var pro222: Product[]  = await pro.getAll();
    // console.log(proTypes,pro222);
    var product: Product[] = await pro.getByFilter({type:"CF"});
    var proty : ProductType[] = await proType.getByFilter({id:"CF"})
    console.log(proty,product);
}


test();