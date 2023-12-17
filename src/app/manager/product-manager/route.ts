import { productService, productTypeService } from "@/domain/ModelService";
import Product from "@/domain/models/Product";
import {  NextResponse } from "next/server";
import ProductData from "./aliases";
import ProductType from "@/domain/models/ProductType";
import ProductTypeData from "../product-type-manager/aliases";

export async function GET() : Promise<NextResponse>{
    //Get products list
    const path : any[] = [];

    const products : Product[] = await productService.getAll(path);

    //Converting product to data
    const productData : ProductData[] = products.map(
        function(product : Product) : ProductData{
            return{
                id: product.Id,
                name: product.Name,
                type: product.Type?.Name,
                price: product.Price,
                description: product.Description
            }
        }
    )

    //Get productTypeList
    const productTypes : ProductType[] = await productTypeService.getAll(path);

    //Converting producttype to data
    const productTypeData : ProductTypeData[] = productTypes.map(
        function(productType : ProductType) : ProductTypeData{
            return {
                id : productType.Id,
                name : productType.Name
            }
        }
    )

    return NextResponse.json(
        {
            success: true,
            products: productData,
            productTypes: productTypeData
        }
    )
}