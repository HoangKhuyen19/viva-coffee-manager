import UserData from "@/app/login/aliases";
import { userService } from "@/domain/ModelService";
import User from "@/domain/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) : Promise<NextResponse>{
    //Get URL search params
    const url : URLSearchParams = request.nextUrl.searchParams;

    //Get keyword
    const keyword : string | null = url.get("key");
    if(keyword != null){
        //Create filter by keyword with reguler expression
        const filter : any = {
            $or : [
                {username: {$regex : new RegExp(keyword,'i')}},
                {fullName: {$regex : new RegExp(keyword, 'i')}},
                {permission: {$regex : new RegExp(keyword, 'i')}}
            ]
        }
        //Get account list by filter
        const path : any[] = [];
        const accountList : User[] = await userService.getByFilter(filter, path);

        //Converting account list to data
        const accounts : UserData[] = accountList.map((account) : UserData => {
            return{
                username : account.Username,
                password : account.Password,
                fullName : account.FullName,
                permission: account.Permission 
            }
        })

        //Return
        return NextResponse.json(
            {
                success: true,
                accounts : accounts
            }
        )
    }

    //If username not null
    return NextResponse.json({})
}