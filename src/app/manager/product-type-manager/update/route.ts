import { productTypeService } from "@/domain/ModelService";
import ProductType from "@/domain/models/ProductType";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) : Promise<NextResponse>{
    //Parse request to json
    const parameters : any = await request.json();

    //Get info product type
    const id: string = parameters.id;
    const name: string = parameters.name;

    //Get product type by id
    const path : any[] = [];
    const productType : ProductType|undefined = await productTypeService.get(id, path);

    //If not found product type
    if(!productType){
        return NextResponse.json(
            {
                success: false,
                message: "Loại sản phẩm không tồn tại"
            }
        )
    }

    //If found product type
    try {
        const productType : ProductType = new ProductType(id, name);
        await productTypeService.update(productType);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Cập nhật không thành công"
            }
        )
    }

    //return
    return NextResponse.json(
        {
            success: true
        }
    )

}