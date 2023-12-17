import { useEffect, useState } from "react";
import AccountPage from "./page/AccountPage";
import User from "../interfaces/User";
 
export default function AccountManager() {
    //States:
    const [accounts, setAccounts] = useState<User[]>([])

    //Effect
    useEffect(() => {
        get();
    }, [])

    //Function:
    async function get(){
        try {
            //Sending http request
            const response: Response = await fetch("manager/account-manager");

            //Parse response body to json
            var { success, message, accounts }: { success: Boolean, message: string, accounts: User[] } = await response.json();

            //If get succesfully 
            if (success) {
                setAccounts(accounts);
            } else {
                //If failed
                alert(message);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình lấy danh sách");
        }
    }

    async function onInsert(account: User) {
        try {
            //Sending http request
            const response: Response = await fetch(
                "/manager/account-manager/add",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            username: account.username,
                            password: account.password,
                            fullName: account.fullName,
                            permission: account.permission
                        }
                    )
                }
            )
            //Parse response body to json
            const { success, message }: { success: boolean, message: string } = await response.json();

            //If insert successfully
            if(success){
                get();
            }else{
                //If insert failed
                alert(message);
            }
            
        } catch (error) {
            alert("Có lỗi trong quá trình tạo tài khoản");
        }
    }

    async function onUpdate(account: User) {
        try {
            //Sending http request
            const response: Response = await fetch(
                "/manager/account-manager/update",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            username: account.username,
                            password: account.password,
                            fullName: account.fullName,
                            permission: account.permission
                        }
                    )
                }
            )
            //Parse response body to json
            const { success, message }: { success: boolean, message: string } = await response.json();

            //If update successfully
            if(success){
                get();
            }else{
                //If update failed
                alert(message);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình cập nhật tài khoản")
        }
    }

    async function onDelete(username: string) {
        try {
            //Sending http request
            const response : Response =  await fetch(`/manager/account-manager/delete?username=${username}`);

            //Parse response body to json
            const {success,message} : { success: boolean, message: string } = await response.json();

            //If delete successfully
            if (success) {
                get();
            } else {
                //If delete failed
                alert(message);
            }

        } catch (error) {
            alert("Có lỗi trong quá trình xóa tài khoản");
        }
    }

    async function onSearch(keyword : string) {
        try {
            //Sending http request
            const response : Response =  await fetch(`/manager/account-manager/search?key=${keyword}`);
            

            //Parse response body to json
            const {success,accounts} : { success: boolean, accounts: User[] } = await response.json();

            //If search successfully
            if (success) {
                setAccounts(accounts);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình tìm kiếm");
        }
    }
    //View
    return (
        <div>
            <AccountPage accounts={accounts} onInsert={onInsert} onUpdate={onUpdate} onDelete={onDelete} onSearch={onSearch} />
        </div>
    );
}
