
import { productService } from "@/domain/ModelService";
import Product from "@/domain/models/Product";
import { NextRequest, NextResponse } from "next/server";
import OrderDetailData from "../aliases";
import OrderDetail from "@/domain/models/OrderDetail";

export async function POST(request : NextRequest) : Promise<NextResponse>{
    //Parse params request to json
    const params : any =await request.json();

    //Get info
    const orderID: string = params.orderID;
    const productID :string = params.product;
    const amount : number = params.amount;

    //Get product by id
    const path : any[] = []
    const product : Product|undefined = await productService.get(productID, path);

    //If product not found
    if(product && product.Price){
        //Calculate price
        const orderDetails : OrderDetail = new OrderDetail(undefined,product,amount,undefined);
        let totalPrice = orderDetails.totalPriceCalculate();
        
        //Create orderDetail data
        const orderDetail : OrderDetailData = {
            orderId: orderID,
            product: productID,
            amount: amount,
            totalPrice: totalPrice
        }

        //Return
        return NextResponse.json(
            {
                success: true,
                orderDetail: orderDetail
            }
        )
    }


    return NextResponse.json(
        {
            success: false,
            message: "Sản phẩm không tồn tại"
        }
    )
    
}