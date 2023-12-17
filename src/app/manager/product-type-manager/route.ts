import ProductType from "@/domain/models/ProductType";
import { NextResponse } from "next/server";
import ProductTypeData from "./aliases";
import { productTypeService } from "@/domain/ModelService";

export async function GET() : Promise<NextResponse>{   
    //Get product types list
    let path : any[] = [];
    const productTypes : ProductType[] = await productTypeService.getAll(path);
    
    //Converting productTypes to data
    const productTypeData : ProductTypeData[] = productTypes.map(
        function(productType : ProductType) : ProductTypeData{
            return {
                id : productType.Id,
                name : productType.Name
            }
        }
    )

    //Return product type list
    return NextResponse.json(
        {
            success: true,
            productTypes: productTypeData
        }
    )
}