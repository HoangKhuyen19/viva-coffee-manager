import { NextRequest, NextResponse } from "next/server";
import OrderDetail from "@/domain/models/OrderDetail";
import { orderDetailService } from "@/domain/ModelService";

export async function POST(request: NextRequest): Promise<NextResponse> {
    //Parse request to json and get order detail list data
    const { orderDetails } = await request.json();

    const path: any[] = [];

    //Converting orderDetail data to Order Detail
    var orderDetailList: OrderDetail[] = await orderDetailService.multiDataToOrderDetail(orderDetails, path);

  
    for (const orderDetail of orderDetailList) {
        await orderDetailService.insert(orderDetail);
    }

    return NextResponse.json(
        {
            success: true
        }
    )
}