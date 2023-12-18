import { orderDetailService, orderService } from "@/domain/ModelService";
import Order from "@/domain/models/Order";
import OrderDetail from "@/domain/models/OrderDetail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    //Get url search params
    const url: URLSearchParams = request.nextUrl.searchParams;

    //Get order ID
    const orderID: string | null = url.get("id");
    
    

    //If order ID not null
    if (orderID != null) {
        const path: any[] = [];

        //Get order by ID
        const order: Order | undefined = await orderService.get(orderID, path);

        //Return if order not exist
        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Đơn hàng không tồn tại"
                }
            )
        }

        //Get order detail list
        const orderDetails: OrderDetail[] = await orderDetailService.getByFilter({ orderId: orderID }, path);

        //Delete order detail list
        for (const orderDetail of orderDetails) {
            await orderDetailService.delete({orderId : orderDetail.OrderId?.Id});
        }

        //Delete order
        await orderService.delete(orderID);

        return NextResponse.json(
            {
                success: true
            }
        )
    }

    return NextResponse.json({})
}