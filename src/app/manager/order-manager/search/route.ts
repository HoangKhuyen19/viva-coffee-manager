import { orderService } from "@/domain/ModelService";
import Order from "@/domain/models/Order";
import { NextRequest, NextResponse } from "next/server";
import { OrderData } from "../aliases";

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
            $or : [
                {date : {$regex : new RegExp(keyword, 'i')}},
                {createdBy : {$regex : new RegExp(keyword, 'i')}}
            ]
        }

        //Get order list by filter
        const orderList : Order[] = await orderService.getByFilter(filter, path);

        //Converting order list to data
        const orderData = orderList.map((order): OrderData => {
            return {
                id: order.Id,
                date: order.Date,
                createdBy: order.CreateBy?.Username,
                totalPrice: order.TotalPrice
            };
        });

        return NextResponse.json({
            success: true,
            orders: orderData
        })
    }

    return NextResponse.json({})
}