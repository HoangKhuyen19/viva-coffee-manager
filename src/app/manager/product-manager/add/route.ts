import { productService } from "@/domain/ModelService";
import Product from "@/domain/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) : Promise<NextResponse>{
    //Parse request to json
    const parameter : any = await request.json();

    //Get info product
    const id: string =  parameter.id;
    const name: string = parameter.name;
    const typeId: string = parameter.typeId;
    const price: number = parameter.price;
    const description: string = parameter.description;
    
    //Get product by id
    const path : any[] = [];
    let product : Product|undefined = await productService.get(id, path);

    //If product exist case
    if(product){
        return NextResponse.json(
            {
                success: false,
                message: "Sản phẩm đã tồn tại"
            }
        )
    }

    //If product not exist case
    const type = await productService.ProductTypeService?.get(typeId, path);

    //Product initialization
    product = new Product(id, name, type, price, description)
    
    //Insert product
    productService.insert(product);

    //Return
    return NextResponse.json(
        {
            success: true
        }
    )
}