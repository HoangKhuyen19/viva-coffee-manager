import { useEffect, useState } from "react";
import OrderPage from "./page/OrderPage";
import Order from "../interfaces/Order";
import User from "../interfaces/User";
import OrderDetail from "../interfaces/OrderDetail";


export default function OrderManager() {
    //State:
    const [orders, setOrders] = useState<Order[]>([]);
    const [accounts, setAccounts] = useState<User[]>([]);
    const [totalPrices, setTotalPrices] = useState<number>()
    //Effect
    useEffect(() => {
        get();
    }, [totalPrices])

    

    //Function
    async function get() {
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

    async function changeAmounts(orderDetails: OrderDetail[]): Promise<void> {

        try {
            const response: Response = await fetch(
                "/manager/order-manager/changeamounts",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            orderDetails: orderDetails
                        }
                    )
                }
            )

            const { success, totalPrice }: { success: boolean, totalPrice: number } = await response.json();

            if (success) {
                setTotalPrices(totalPrice);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình xử lý");
        }
    }

    async function onInsert(order: Order): Promise<void> {
        try {
            const response: Response = await fetch(
                "/manager/order-manager/add",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                             id :order.id,
                             date: order.date,
                             createdBy: order.createdBy,
                             totalPrice: order.totalPrice
                        }
                    )
                }
            )

            const {success, message} : {success:boolean,message:string} = await response.json();

            if(success){
                get();
            }else{
                alert(message);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình xử lý");
        }
    }
    //View
    return (
        <OrderPage orders={orders} accounts={accounts} totalPrice={totalPrices} changeAmounts={changeAmounts} onInsert={onInsert} />
    )
}
