import { productTypeService } from "@/domain/ModelService";
import ProductType from "@/domain/models/ProductType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) : Promise<NextResponse>{
    const searchParams : URLSearchParams = request.nextUrl.searchParams;

    const id: string | null =  searchParams.get("id")

    //Get product type by id   
    if(id != null) {
        const path: any[] = [];
        var productType : ProductType|undefined = await productTypeService.get(id, path);
    }


    //Product Type not exist
    if(!productType){
        return NextResponse.json(
            {
                success: false,
                message: "Loại sản phẩm không tồn tại"
            }
        )
    }

    //delete if product exist
    try {
        productTypeService.delete(id);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                messge: "Xoá loại sản phẩm không thành công"
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