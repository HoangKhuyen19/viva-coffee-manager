import { orderDetailService } from "@/domain/ModelService";
import Product from "@/domain/models/Product";
import { NextResponse } from "next/server";
import ProductData from "../product-manager/aliases";

export async function GET() : Promise<NextResponse>{
    //Get products
    const path : any[] = [];

    const productList : Product[] | undefined = await orderDetailService.ProductService?.getAll(path);

    //Converting productList to data
    const products = productList?.map((product) : ProductData => {
        return{
            id: product.Id,
            name: product.Name,
            price: product.Price
        }
    })

    //Return 
    return NextResponse.json(
        {
            success: true,
            products: products
        }
    )
} 