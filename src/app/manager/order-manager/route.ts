import { orderService } from "@/domain/ModelService";
import Order from "@/domain/models/Order";
import {  NextResponse } from "next/server";
import {OrderData} from "./aliases";
import User from "@/domain/models/User";
import AccountData from "../account-manager/aliases";


export async function GET() : Promise<NextResponse>{
    //Get order list
    const path : any[] = [];
    const orderList : Order[] = await orderService.getAll(path);

    //Converting order list to data
    const orders : OrderData[] = orderList.map(
        (order) : OrderData=> {
            return{
                id: order.Id,
                date: order.Date,
                createdBy: order.CreateBy?.Username,
                totalPrice: order.TotalPrice
            } 
        }
    )
    
    const accountList: User[] | undefined = await orderService.UserService?.getAll(path);

     //Converting account list to data
     var accounts = accountList?.map((account) : AccountData =>{
        return{
            username: account.Username as string,
            password: account.Password as string,
            fullName: account.FullName as string,
            permission: account.Permission as string
        }
    })
    //return
    return NextResponse.json(
        {
            success: true,
            orders: orders,
            accounts: accounts
        }
    )
}