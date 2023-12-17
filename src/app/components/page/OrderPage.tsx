import { useEffect, useState } from "react";
import Search from "../Search";
import OrderDetailManager from "../OrderDetailManager";
import Order from "@/app/interfaces/Order";
import User from "@/app/interfaces/User";
import { AccountProps } from "./AccountPage";
import OrderDetail from "@/app/interfaces/OrderDetail";

//Type
export type ChangeProductsAmountEventHandler = (orderDetails: OrderDetail[]) => void;

//Interface
export interface ChangAmountsProps{
    changeAmounts? : ChangeProductsAmountEventHandler;
}

interface OrdersProps {
    orders: Order[];
}

interface OrderTableRowProps {
    order: Order;
}

interface OptionAccountProps{
    account : User;
}

export default function OrderPage({ orders, accounts, changeAmounts ,totalPrice}: OrdersProps & AccountProps & ChangAmountsProps & {totalPrice? :number}) {
    //States:
    const [isFormVisible, setFormVisible] = useState(false);
    const [detailStatus, setDetailStatus] = useState(false);
    const [fields, setFields] = useState<Order>({totalPrice:undefined});
    
    //Effect:
    useEffect(() => {
        setFields((prevFields) => ({ ...prevFields,totalPrice : totalPrice }));
    }, [totalPrice]);
    
    //EventHandler:
    function showForm() {
        if(!detailStatus){
            setFields({...fields,id:getOrderId()})
        }
        setFormVisible(true);
    };

    function closeForm() {
        setFormVisible(false);
        setDetailStatus(false);
        setFields({});
        totalPrice = undefined;
    };

    function onDetailStatus( order : Order){
        //Change detail status to true
        setDetailStatus(true);

        //Show form
        showForm();

        //Update fields
        setFields(order);
    }

    function onFieldChanged({ target }: any) {
        //Get name
        const name: string = target.name;

        //Get value
        const value: any = target.value;    

        //Update fields
        setFields({ ...fields, [name]: value });
    }

    function OrderTableRow({ order }: OrderTableRowProps) {
        return (
            <tr>
                <td>{order.id}</td>
                <td>{order.date ? order.date.toString() : ""}</td>
                <td>{order.createdBy}</td>
                <td>{order.totalPrice}</td>
                <td>
                    <button className="button-update" onClick={() => onDetailStatus(order)}>Chi tiết</button><br />
                    <button className="button-delete">Xóa</button>
                </td>
            </tr>
        )
    }

    function OptionAccount( {account} : OptionAccountProps){
        return(
            <option value={account.username}>
                {account.fullName}
            </option>
        )
    }

    function getOrderId(){
        const date = new Date();
        const year = String(date.getFullYear()).slice(2,4);
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDay()).padStart(2,'0');
        const hours = String(date.getHours()).padStart(2,'0');
        const minutes = String(date.getMinutes()).padStart(2,'0');
        const seconds = String(date.getSeconds()).padStart(2,'0')
        return "DH"+ year + month + day +hours +minutes + seconds;
    }

    function getCurrentDate(){
        const date = new Date();
        const year = String(date.getFullYear());
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }

    function lowerSubmit(event: any) {
        //Preventing default event
        event.preventDefault();
    }
    //Views
    return (
        <div>
            {/* Search bar */}
            <div>
                <div className="form-search">
                    <label htmlFor="orderSearch">Đơn hàng :</label>
                    <Search />
                    <button className="btn-searchadd" type="button" onClick={showForm}>Thêm</button>
                </div><br />
            </div>

            {/* Table */}
            <table border={1} cellPadding={5} id="productTable">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Người tạo</th>
                        <th>Ngày tạo</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order: Order) => (
                            <OrderTableRow
                                key={order.id}
                                order={order}
                            />
                        ))
                    }
                </tbody>
            </table>


            {/* Form detail */}
            {isFormVisible && (
                <div className="from-overlay container-oder">
                    <div className=" form-oder">
                        <form onSubmit={lowerSubmit}>
                            <span className="close-btn" onClick={closeForm}>X</span>
                            <h2>Đơn hàng</h2>

                            {/* Order ID */}
                            <input className="orderId" type="text" name="id" value={fields.id ? fields.id : ""} onChange={onFieldChanged} placeholder="Mã đơn hàng" required disabled/>

                            {/* Date */}
                            <input className="orderDate" type="date" value={fields.date instanceof Date ? fields.date.toISOString().slice(0,10) : getCurrentDate()} onChange={onFieldChanged} placeholder="Ngày tạo" required disabled/><br />

                            {/* Created By */}
                            <select className="orderUser" name="createdBy" value={fields.createdBy? fields.createdBy : ""} onChange={onFieldChanged}>
                                <option value="" hidden>Người tạo</option>
                                {
                                    accounts.map((account) => (<OptionAccount key={account.username} account={account}/>))
                                }
                            </select><br />

                            {/* Total Price */}
                            <input className="orderTotal" type="number" name="totalPrice" value={fields.totalPrice? fields.totalPrice : ""} onChange={onFieldChanged} placeholder="Tổng tiền" required /><br />
                           
                            {/* Order Detail Manager */}
                            <OrderDetailManager changeAmounts={changeAmounts}/>
                        </form>
                        

                    </div>
                </div>
            )}
        </div>
    );
}