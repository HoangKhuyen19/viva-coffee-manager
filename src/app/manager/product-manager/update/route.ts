import { productService } from "@/domain/ModelService";
import Product from "@/domain/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) : Promise<NextResponse>{
    //Parse request to json
    const params: any = await request.json();

    //Get info product
    const id: string = params.id;
    const name: string = params.name;
    const typeId: string = params.typeId;
    const price: number = params.price;
    const description: string =params.description;

    //Get product by id
    const path : any[] = [];
    let product : Product | undefined = await productService.get(id, path) 

    //If product not exist case
    if(!product){
        return NextResponse.json(
            {
                success: false,
                message: "Sản phẩm đã tông tại"
            }
        )
    }

    //If product exist case
    const type = await productService.ProductTypeService?.get(typeId,path);
    
    //Product initialization
    product = new Product(id, name, type, price, description);

    //Update product
    productService.update(product);

    //Return:
    return NextResponse.json(
        {
            success: true
        }
    )
}