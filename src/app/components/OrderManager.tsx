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
    //View
    return (
        <OrderPage orders={orders} accounts={accounts} loadPage={getAllOrder} />
    )
}
