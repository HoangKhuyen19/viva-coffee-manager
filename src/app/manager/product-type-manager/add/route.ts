import { productTypeService } from "@/domain/ModelService";
import ProductType from "@/domain/models/ProductType";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) : Promise<NextResponse> {
    //Parse request to json
    const parameters : any = await request.json();

    //Get info product type
    const path: any[] = [];
    const id: string =  parameters.id;
    const name: string = parameters.name;

    //Get product type by id
    let productType : ProductType | undefined = await productTypeService.get(id, path);
    
    //If product type exist case
    if(productType){
        return NextResponse.json(
            {
                success: false,
                message:"Sản phẩm đã tồn tại"
            }
        )
    }
    
    //If product type not found
    productType = new ProductType(id, name)

    //Insert product type to DB
    try {
        productTypeService.insert(productType);
    } catch (error) {
        NextResponse.json(
            {
                success: false,
                message: "Thêm loại sản phẩm không thành công"
            }
        )
    }
    

    //Return
    return NextResponse.json(
        {
            success: true
        }
    )
}