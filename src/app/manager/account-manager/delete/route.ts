import { userService } from "@/domain/ModelService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) : Promise<NextResponse>{
    //Get url search params
    const url : URLSearchParams =  request.nextUrl.searchParams;

    //Get username
    const username : string | null = url.get("username");

    //If username null
    if(username == null){
        return NextResponse.json(
            {
                success: false,
                message: "Tài khoản không tồn tại"
            }
        )
    }

    //If username not null
    userService.delete(username);

    return NextResponse.json(
        {
            success: true
        }
    )
}