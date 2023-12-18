import { useEffect, useState } from "react";
import OrderPage from "./page/OrderPage";
import Order from "../interfaces/Order";
import User from "../interfaces/User";

export default function OrderManager() {
    //State:
    const [orders, setOrders] = useState<Order[]>([]);
    const [accounts, setAccounts] = useState<User[]>([]);
    //Effect
    useEffect(() => {
        getAllOrder();
    },[])

    //Function
    async function getAllOrder() {
        try {
            //Sending http request
            const response: Response = await fetch("/manager/order-manager");

            //Parse response body to json
            const { success, orders, accounts }: { success: boolean, message: string, orders: Order[], accounts: User[] } = await response.json();

            //Get successfully
            if (success) {
                setOrders(orders);
                setAccounts(accounts);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình truy cập tới đơn hàng");
        }
    }

    async function onSearch(keyword : string) : Promise<void>{
        try {
            //Sending http request
            const response : Response = await fetch(`/manager/order-manager/search?key=${keyword}`);

            //Parse response body to json
            const {success, orders} : {success: boolean, orders: Order[]} = await response.json();

            if(success){
                setOrders(orders);
            }

        } catch (error) {
            alert("Có lỗi trong quá trình tìm kiếm");
        }
    }

    async function onDelete(id : string) : Promise<void>{
        try {
            const response : Response =  await fetch(`/manager/order-manager/delete?id=${id}`);
            const {success, message} : {success: boolean, message: string} = await response.json();
            

            
            if(success){
                getAllOrder();
            }else{
                alert(message);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình xử lý");
        }
    }

    //View
    return (
        <OrderPage orders={orders} accounts={accounts} loadPage={getAllOrder} onSearch={onSearch} onDelete={onDelete}/>
    )
}
