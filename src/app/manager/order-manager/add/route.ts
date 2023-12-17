import { orderService } from "@/domain/ModelService";
import Order from "@/domain/models/Order";
import User from "@/domain/models/User";
import { NextResponse } from "next/server";

export async function POST(request : Request) : Promise<NextResponse>{
    //Parse request to json
    const params : any = await request.json();

    //Get info
    const id : string = params.id;
    const date: Date = params.date;
    const createdBy: string = params.createdBy;
    const totalPrice: number = params.totalPrice;

    //Get order by id
    const path : any[] = [];
    const order: Order | undefined = await orderService.get(id,path);

    //If order exist
    if (order) {
        return NextResponse.json({
            success: false,
            message: "Mã hoá đơn đã tồn tại"
        });
    }

    //Get created by user
    const createdByUser: User | undefined = await orderService.UserService?.get(createdBy,path);

    //If order not exist
    const newOrder = new Order(id, date,totalPrice,createdByUser);

    //Insert new order
    await orderService.insert(newOrder);

    // Return success
    return NextResponse.json(
        {
            success: true
        }
    )
}