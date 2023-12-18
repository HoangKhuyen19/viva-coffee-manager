import { NextResponse } from "next/server";
import { OrderData, OrderDetailData } from "../aliases";
import Order from "@/domain/models/Order";
import { orderDetailService, orderService } from "@/domain/ModelService";
import User from "@/domain/models/User";
import OrderDetail from "@/domain/models/OrderDetail";
import OrderDetailService from "@/domain/OrderDetailService";

export async function POST(request: Request): Promise<NextResponse> {
    //Parse request to json
    const params: any = await request.json();

    //Get info
    const orderData: OrderData = params.order;
    const orderDetailData = params.orderDetails;

    //Get order by id
    const path: any[] = [];

    if (!orderData.id) {
        return NextResponse.json(
            {
                success: false,
                message: "Vui lòng chọn mã hoá đơn!!"
            }
        )
    }

    let order: Order | undefined = await orderService.get(orderData.id, path);

    //Return if order exist
    if (order) {
        return NextResponse.json(
            {
                success: false,
                message: "Mã hoá đơn đã tồn tại"
            }
        )
    }

    //Get createdBy
    const userData = orderData.createdBy as string;
    const user: User | undefined = await orderService.UserService?.get(userData, path);

    //Order declaration
    order = new Order(orderData.id, orderData.date, orderData.totalPrice, user)

    //Insert order
    await orderService.insert(order);

    //Get obj order
    const orderObj: Order | undefined = await orderService.get(orderData.id, path);

    //If order 
    if (orderObj) {
        const orderDetails: OrderDetail[] = await Promise.all(orderDetailData.map(async (orderDetail: OrderDetailData): Promise<OrderDetail> => {
            if (orderDetail.product) {
                const orderId = orderObj;
                const amount = orderDetail.amount;
                const product = await orderDetailService.ProductService?.get(orderDetail.product, path);
                const totalPrice = orderDetail.totalPrice;
                return new OrderDetail(orderId, product, amount, totalPrice);
            }
            return new OrderDetail();
        }))

        //Insert order detail to DB
        for (const orderDetail of orderDetails) {

            //Check order id and product ordet exist
            if(orderDetail.OrderId?.Id && orderDetail.Product?.Id){

                //Get orderDetail by order id and product id
                const detail : OrderDetail | undefined = await orderDetailService.get(orderDetail.OrderId?.Id,orderDetail.Product?.Id,path);

                //Update if order detail exist
                if(detail){
                    orderDetail.Amount = (detail.Amount|| 0) + (orderDetail.Amount || 0)
                    orderDetail.TotalPrice = (detail.TotalPrice|| 0) + (orderDetail.TotalPrice || 0)
                    await orderDetailService.update(orderDetail);
                }else{
                    //Insert if order detail not exist
                    await orderDetailService.insert(orderDetail);
                }
            }
        }
    }

    //Return
    return NextResponse.json(
        {
            success: true
        }
    )
}