import { UserService } from "@/domain/UserService";
import IUserService from "@/domain/interfaces/IUserService";
import User from "@/domain/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) : Promise<NextResponse>{
    //Parse request to json():
    const parameter : any = await request.json();

    //Get username and password
    const username: string = parameter.username;
    const password:  string = parameter.password;

    //User Service declaration
    const userService : IUserService = new UserService();

    //Get user based on username
    const user : User | undefined = await userService.get(username);

    //User not found case
    if(!user){
        return NextResponse.json({
            success:false,
            message:"Tài khoản hoặc mật khẩu không đúng"
        });
    }

    //Password invalid case
    if(user.Password !== password){
        return NextResponse.json({
            success: false,
            message: "Tài khoản hoặc mật khẩu không đúng"
        });
    }

    return NextResponse.json({
        success: true,
        user
    });

    
}