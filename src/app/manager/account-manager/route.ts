import { userService } from "@/domain/ModelService";
import User from "@/domain/models/User";
import { NextRequest, NextResponse } from "next/server";
import AccountData from "./aliases";

export async function GET(request : NextRequest) : Promise<NextResponse>{
    //Get acount list
    const path : any[] = [];

    const accounts : User[] = await userService.getAll(path);

    //Converting accounts to data
    const accountData = accounts.map((account) : AccountData => {
        return{
            username: account.Username,
            password: account.Password,
            fullName: account.FullName,
            permission: account.Permission
        }
    })

    //Return account data
    return NextResponse.json(
        {
            success: true,
            accounts: accountData
        }
    )
 
}