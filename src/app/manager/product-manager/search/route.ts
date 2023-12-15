import { productService } from "@/domain/ModelService";
import Product from "@/domain/models/Product";
import { NextRequest, NextResponse } from "next/server";
import ProductData from "../aliases";

export async function GET(request : NextRequest) : Promise<NextResponse>{
    //Get url search params
    const url : URLSearchParams = request.nextUrl.searchParams;

    //Get keyword
    const keyword : string|null = url.get("key");

    //If keyword not null
    if(keyword != null){
        const path : any[] = [];

        //Create filter by keyword with reguler expression
        const filter : any = {
            $or:[
                {id : {$regex: new RegExp(keyword, 'i')}},
                {name: {$regex : new RegExp(keyword,'i')}},
                {price: {$regex: new RegExp(keyword, 'i')}},
                {description: {$regex: new RegExp(keyword,'i')}}
            ]
        }

        //Get product list by filter
        const productList : Product[] = await productService.getByFilter(filter,path);

        //Converting productList to data
        const products : ProductData[] = productList.map(
            function(product) :  ProductData{
                return(
                    {
                        id: product.Id,
                        name: product.Name,
                        price: product.Price,
                        type: product.Type?.Name,
                        description: product.Description
                    }
                )
            }
        )

        return NextResponse.json(
            {
                success: true,
                products : products
            }
        )
    }

    return NextResponse.json({});
}