import { useState } from "react";
import Search from "../Search";
import Order from "@/app/interfaces/Order";
import User from "@/app/interfaces/User";
import { AccountProps } from "./AccountPage";
import OrderDetail from "@/app/interfaces/OrderDetail";
import Product from "@/app/interfaces/Product";
import OrderDetailPage from "./OrderDetailPage";

//Type
export type ChangeProductsAmountEventHandler = (orderDetails: OrderDetail[]) => void;
export type OnInsertEvenHandler = (fields: Order) => void
export type LoadPageEventHandler = () => void;
export type KeyWordEventHandler = (keyword: string) => void;
//Interface
interface OrdersProps {
    orders: Order[];
}
interface OrderTableRowProps {
    order: Order;
}
interface OptionAccountProps {
    account: User;
}
interface LoadPageProps {
    loadPage?: LoadPageEventHandler;
}

interface OnSearchProps {
    onSearch?: KeyWordEventHandler;
}
interface OnDeleteProps {
    onDelete?: KeyWordEventHandler;
}

export default function OrderPage({ orders, accounts, loadPage, onSearch, onDelete }: OrdersProps & AccountProps & LoadPageProps & OnSearchProps & OnDeleteProps) {
    //States:
    const [isFormVisible, setFormVisible] = useState(false);
    const [detailStatus, setDetailStatus] = useState(false);
    const [order, setOrder] = useState<Order>({});
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orderDetail, setOrderDetail] = useState<OrderDetail>({})

    //EventHandler:
    function onOrderDetailChanged({ target }: any) {
        //Get name:
        const name: string = target.name;

        //Get value
        const value: any = target.value;

        //Update order detail fields:
        setOrderDetail({ ...orderDetail, [name]: value });
    }

    function showForm() {
        getOrderDetail();

        //Set order id if detail status is false
        if (!detailStatus) {
            setOrder({ ...order, id: getOrderId() })
        }

        setFormVisible(true);
    };

    function closeForm() {
        //Update states:
        setFormVisible(false);
        setDetailStatus(false);
        setOrder({});
        setOrderDetails([]);
        console.log("False nè", detailStatus)
    };

    function onDetailStatus(order: Order) {
        //Change detail status to true
        setDetailStatus(true);

        //Show form 
        showForm();

        getOrderDetail(order);

        //Update fields
        setOrder(order);
    }

    function onLowerDelete(id : string){
        if(onDelete){
            onDelete(id);
        }
    }

    function onOrderFieldsChanged({ target }: any) {
        //Get name
        const name: any = target.name;

        //Get value
        let value: any = target.value;

        //Update fields
        setOrder({ ...order, [name]: value });
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
    function lowerAddProduct(event: any) {
        //Preventing default event:
        event.preventDefault();

        //Not all product details provided
        if ((orderDetail.amount || orderDetail.product) === undefined) {
            alert("Vui lòng chọn đủ thông tin để thêm sản phẩm");
        } else {
            //Find product option
            const product = products.find((product) => (product.id === orderDetail.product))

            //Calculate total price order detail
            orderDetail.totalPrice = (orderDetail.amount as number) * (product?.price as number)

            //Update order detail
            setOrderDetail({ product: product?.name as string })

            //Calculator total price order
            const updateOrder = { ...order };
            updateOrder.totalPrice = (updateOrder.totalPrice || 0) + (orderDetail.totalPrice || 0);

            //Update total price order
            setOrder(updateOrder)

            //Add order detail to order detail list
            setOrderDetails([...orderDetails, orderDetail]);

            //Update order detail
            setOrderDetail({});
        }
    }

    function lowerOnInsert(event: any) {
        //Preventing default event
        event.preventDefault();

        //call insertOder
        insertOrder(order, orderDetails);

        closeForm();
    }
    function removeDetail(id: string) {
        setOrderDetails(orderDetails.filter((orderDetail) => orderDetail.product !== id));
    }


    //Views
    return (
        <div>
            {/* Search bar */}
            <div>
                <div className="form-search">
                    <label htmlFor="orderSearch">Đơn hàng :</label>
                    <Search onSearch={onSearch ? onSearch : undefined} />
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
                            <h2>ĐƠN HÀNG</h2>

                            {/* Order ID */}
                            <input className="orderId" type="text" name="id" value={order.id ? order.id : getOrderId()} onChange={onOrderFieldsChanged} placeholder="Mã đơn hàng" required disabled />

                            {/* Date */}
                            <input
                                className="orderDate"
                                type="date"
                                name="date"
                                value={!(order.date instanceof Date) ? order.date : ""}
                                onChange={onOrderFieldsChanged}
                                placeholder="Ngày tạo"
                                required
                            />

                            {/* Created By */}
                            <select className="orderUser" name="createdBy" value={order.createdBy ? order.createdBy : ""} onChange={onOrderFieldsChanged} required>
                                <option value="" hidden>Người tạo</option>
                                {
                                    accounts.map((account) => (<OptionAccount key={account.username} account={account} />))
                                }
                            </select><br />

                            {/* order detail fields */}
                            {
                                !detailStatus && (
                                    <div className="form-add">

                                        {/* Select product */}
                                        <select className="orderItem" name="product" value={orderDetail.product ? orderDetail.product : ""}
                                            onChange={onOrderDetailChanged}>
                                            <option value="" hidden> Sản phẩm </option>

                                            {/* Render product list */}
                                            {
                                                products.map((product) => (
                                                    <OptionProduct key={product.id} product={product} />
                                                ))
                                            }
                                        </select>

                                        {/* Amount */}
                                        <input className="orderAmout" type="number" name="amount" value={orderDetail.amount ? orderDetail.amount : ""} onChange={onOrderDetailChanged} placeholder="Số lượng" />

                                        {/* Add Product */}
                                        <button className="btn-add" onClick={lowerAddProduct}> Thêm </button>
                                    </div>
                                )
                            }

                            {/* Total Price */}
                            <div className="totalPrice">
                                <span>Tổng thành tiền: </span>
                                <input className="orderTotal" type="number" name="totalPrice" value={order.totalPrice ? order.totalPrice : ""} onChange={onOrderFieldsChanged} placeholder="0" required disabled />
                            </div>


                            {/* Order Detail Manager */}
                            <OrderDetailPage orderDetails={orderDetails} products={products} removeDetail={removeDetail} detailStatus={detailStatus}/>


                            {/* Submit */}
                            {
                                !detailStatus && (
                                    <div className="bottom">
                                        <button className="btn-order" type="submit">Tạo đơn</button>
                                    </div>
                                )
                            }

                        </form>
                    </div>
                </div>
            )}
        </div>
    );

    //Component:
    function OrderTableRow({ order }: OrderTableRowProps) {
        return (
            <tr>
                <td>{order.id}</td>
                <td>{order.date instanceof Date ? order.date.toLocaleDateString().slice(0, 10) : order.date}</td>
                <td>{order.createdBy}</td>
                <td>{order.totalPrice}</td>
                <td>
                    <button className="button-update" onClick={() => onDetailStatus(order)}>Chi tiết</button>
                    <button className="button-delete" onClick={() => onLowerDelete(order.id ? order.id :"")}>Xóa</button>
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

    function OptionProduct({ product }: OptionProductProps) {
        return (
            <option value={product.id}>
                {product.name}
            </option>
        );
    }
    //Route
    async function getOrderDetail(order?: Order): Promise<void> {
        try {
            //Sending http request
            const response: Response = await fetch(`/manager/order-manager/orderDetails?order=${order?.id}`)

            //Parse response body to json
            const { success, products, orderDetails }: { success: boolean, products: Product[], orderDetails: OrderDetail[] } = await response.json();

            if (success) {
                setProducts(products);
                if (orderDetails) {
                    setOrderDetails(orderDetails);
                }
            }

        } catch (error) {
            alert("Có lỗi trong quá trình xử lý!!")
        }
    }

    async function insertOrder(order: Order, orderDetails: OrderDetail[]): Promise<void> {
        try {
            console.log(order);
            console.log(orderDetails)
            //Sending http request
            const response: Response = await fetch(
                "/manager/order-manager/add",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            order: order,
                            orderDetails: orderDetails
                        }
                    )
                }
            )
            //Parse response body to json
            const { success, message }: { success: boolean, message: string } = await response.json();

            //If successfully
            if (success) {
                if (loadPage) {
                    loadPage();
                }
            } else {
                alert(message)
            }
        } catch (error) {
            alert("Có lỗi trong quá trình tạo hoá đơn");
        }
    }

}

interface OptionProductProps {
    product: Product;
}