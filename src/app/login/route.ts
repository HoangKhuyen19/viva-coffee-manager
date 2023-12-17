import { userService } from "@/domain/ModelService";
import User from "@/domain/models/User";
import { NextRequest, NextResponse } from "next/server";
import UserData from "./aliases";

export async function POST(request : NextRequest) : Promise<NextResponse>{
    //Parse request to json():
    const parameter : any = await request.json();
    
    
    //Get username and password
    const username: string = parameter.username;
    const password:  string = parameter.password;

    //Get user based on username
    const path : any[] = [];
    const user : User | undefined = await userService.get(username, path);

    //User not found case
    if(!user){
        return NextResponse.json({
            success:false,
            message:"Tài khoản hoặc mật khẩu không đúng"
        });
    }


    //Converting User to UserData if found user
        const userData : UserData = {
        username : user?.Username as string,
        fullName : user?.FullName as string,
        permission : user?.Permission as string
    }

    //Password invalid case
    if(user.Password !== password){
        return NextResponse.json({
            success: false,
            message: "Tài khoản hoặc mật khẩu không đúng"
        });
    }

    //Valid case
    return NextResponse.json({
        success: true,
        user : userData
    });
}