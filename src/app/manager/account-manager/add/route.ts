import { userService } from "@/domain/ModelService";
import User, { UserPermission } from "@/domain/models/User";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request : NextRequest) : Promise<NextResponse>{
    //Parse request to json
    const params : any = await request.json();

    //Get info account
    const username : string = params.username;
    const password : string = params.password;
    const fullName : string = params.fullName;
    const permission : UserPermission  = params.permission ;

    //Get account by username
    const path : any[] = [];
    let account : User | undefined = await userService.get(username, path);

    //If account exist case
    if(account){
        return NextResponse.json(
            {
                success:false,
                message: "Tài khoản đã tồn tại"
            }
        )
    }

    //If account not exist case
    account = new User(username, password, fullName, permission);

    //Insert account
    userService.insert(account);

    return NextResponse.json(
        {
            success: true
        }
    )
}