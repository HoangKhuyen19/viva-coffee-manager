import { productTypeService } from "@/domain/ModelService";
import ProductType from "@/domain/models/ProductType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const url: URLSearchParams = request.nextUrl.searchParams;

    const id: string | null = url.get("id")

    //If id not null 
    if (id != null) {
        const path: any[] = [];

        //Get product type by id
        const productType: ProductType | undefined = await productTypeService.get(id, path);

        //Product Type not exist
        if (!productType) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Loại sản phẩm không tồn tại"
                }
            )
        }

        //Delete if product type exist
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
    }

    //Return
    return NextResponse.json(
        {
            success: true
        }
    )
}