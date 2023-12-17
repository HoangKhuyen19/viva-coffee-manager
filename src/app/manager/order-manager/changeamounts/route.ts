import { orderDetailService, orderService } from "@/domain/ModelService";
import OrderDetail from "@/domain/models/OrderDetail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) : Promise<NextResponse>{
    //Parse request body to json
    const { orderDetails } = await request.json();
    
    //Converting orderDetail data to Order Detail
    const path : any[] = [];
    
    const orderDetailList : OrderDetail[] = await orderDetailService.multiDataToOrderDetail(orderDetails,path);
    console.log(orderDetailList);

    
    let totalPrice : number = 0;
    
    for (const order of orderDetailList) {
        totalPrice += order.totalPriceCalculate();
    }

    return NextResponse.json(
        {
            success:true,
            totalPrice : totalPrice
        }
    )

    
    
}