import { useEffect, useState } from "react";
import Search from "../Search";
import OrderDetailManager from "../OrderDetailManager";
import Order from "@/app/interfaces/Order";
import User from "@/app/interfaces/User";
import { AccountProps } from "./AccountPage";
import OrderDetail from "@/app/interfaces/OrderDetail";

//Type
export type ChangeProductsAmountEventHandler = (orderDetails: OrderDetail[]) => void;
export type OnInsertEvenHandler = (fields: Order) => void

//Interface
export interface ChangAmountsProps {
    changeAmounts?: ChangeProductsAmountEventHandler;
}
interface OnInsertProps {
    onInsert?: OnInsertEvenHandler;
}


interface OrdersProps {
    orders: Order[];
}

interface OrderTableRowProps {
    order: Order;
}

interface OptionAccountProps {
    account: User;
}

export default function OrderPage({ orders, accounts, changeAmounts, totalPrice, onInsert }: OrdersProps & AccountProps & ChangAmountsProps & { totalPrice?: number } & OnInsertProps) {
    //States:
    const [isFormVisible, setFormVisible] = useState(false);
    const [detailStatus, setDetailStatus] = useState(false);
    const [fields, setFields] = useState<Order>({});


    //Effect:
    useEffect(() => {
        if (totalPrice !== undefined) {
            setFields((prevFields) => ({ ...prevFields, totalPrice: totalPrice }));
        }
    }, [totalPrice]);

    //EventHandler:
    function showForm() {
        if (!detailStatus) {
            setFields({ ...fields, id: getOrderId() })
        }
        setFormVisible(true);
    };

    function closeForm() {
        setFormVisible(false);
        setDetailStatus(false);
        setFields({});
    };

    function onDetailStatus(order: Order) {
        //Change detail status to true
        setDetailStatus(true);

        //Show form
        showForm();

        //Update fields
        setFields(order);
        console.log(order)
    }

    function onFieldChanged({ target }: any) {
        //Get name
        const name: any = target.name;

        //Get value
        let value: any = target.value;

        //Update fields
        setFields({ ...fields, [name]: value });
    }


    function OrderTableRow({ order }: OrderTableRowProps) {
        return (
            <tr>
                <td>{order.id}</td>
                <td>{order.date instanceof Date ? order.date.toLocaleDateString().slice(0, 10) : order.date}</td>
                <td>{order.createdBy}</td>
                <td>{order.totalPrice}</td>
                <td>
                    <button className="button-update" onClick={() => onDetailStatus(order)}>Chi tiết</button>
                    <button className="button-delete">Xóa</button>
                </td>
            </tr>
        )
    }

    function OptionAccount({ account }: OptionAccountProps) {
        return (
            <option value={account.username}>
                {account.fullName}
            </option>
        )
    }

    function lowerOnInsert(event: any) {
        event.preventDefault();
   
        if (onInsert) {
            onInsert(fields);
        }
        
        closeForm();
    }
    function getOrderId() {
        const date = new Date();
        const year = String(date.getFullYear()).slice(2, 4);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return "DH" + year + month + day + hours + minutes + seconds;
    }

    function getCurrentDate() {
        const date = new Date();
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
                        <th>Ngày tạo</th>
                        <th>Người tạo</th>
                        <th>Tổng tiền</th>
                        <th>Hành động</th>
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
                        <form onSubmit={lowerOnInsert}>
                            <span className="close-btn" onClick={closeForm}>X</span>
                            <h2>Đơn hàng</h2>

                            {/* Order ID */}
                            <input className="orderId" type="text" name="id" value={fields.id ? fields.id : getOrderId()} onChange={onFieldChanged} placeholder="Mã đơn hàng" required disabled />

                            {/* Date */}
                            <input
                                className="orderDate"
                                type="date"
                                name="date"
                                value={!(fields.date instanceof Date) ? fields.date : ""}
                                onChange={onFieldChanged}
                                placeholder="Ngày tạo"
                                required
                            />

                            {/* Created By */}
                            <select className="orderUser" name="createdBy" value={fields.createdBy ? fields.createdBy : ""} onChange={onFieldChanged} required>
                                <option value="" hidden>Người tạo</option>
                                {
                                    accounts.map((account) => (<OptionAccount key={account.username} account={account} />))
                                }
                            </select><br />

                            {/* Total Price */}
                            <input className="orderTotal" type="number" name="totalPrice" value={fields.totalPrice ? fields.totalPrice : ""} onChange={onFieldChanged} placeholder="Tổng thành tiền" required disabled /><br />

                            {/* Order Detail Manager */}
                            <OrderDetailManager 
                                changeAmounts={changeAmounts} 
                                orderID={fields.id ? fields.id : ""} 
                                // onInsertDetail={ onInsertDetail }
                            />

                            {/* Submit */}  
                            <div className="bottom">
                                <button className="btn-order" type="submit">Tạo đơn</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}