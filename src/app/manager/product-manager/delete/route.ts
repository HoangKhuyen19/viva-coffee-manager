import { productService } from "@/domain/ModelService";
import Product from "@/domain/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) : Promise<NextResponse>{
    //Get url params
    const url : URLSearchParams = request.nextUrl.searchParams;

    //Get id
    const id : string | null = url.get("id");

    //If id not null
    const path : any[] = [];
    if(id){
        //Get product by id
        const product : Product|undefined = await productService.get(id, path);

        if(!product){
            return NextResponse.json(
                {
                    success: false,
                    message: "Sản phẩm không tồn tại"
                }
            )
        }

        productService.delete(id);
    }
    
    return NextResponse.json(
        {
            success: true
        }
    )
}