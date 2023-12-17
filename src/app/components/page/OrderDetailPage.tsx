import OrderDetail from "@/app/interfaces/OrderDetail"
import Product from "@/app/interfaces/Product";
import { useState } from "react"
import { ProductProps } from "./ProductPage";

//Type
export type ChangeProductAmountEventHandler = (orderDetail : OrderDetail) => void;

//Interface
export interface ChangeAmountProps{
    changeAmount? : ChangeProductAmountEventHandler;
}
interface OrderDetailsProps {
    orderDetails?: OrderDetail[];
}

interface OptionProductProps {
    product: Product;
}

interface OrderDetailRowProps {
    orderDetail?: OrderDetail;
}

export default function OrderDetailPage({ orderDetails, productList, changeAmount }: OrderDetailsProps & ProductProps & ChangeAmountProps) {
    //States:
    const [orderDetail, setOrderDetail] = useState<OrderDetail>({});

    //Event Handler
    function onOrderDetailChanged({ target }: any) {
        //Get name:
        const name: string = target.name;

        //Get value
        const value: any = target.value;

        //Update fields
        setOrderDetail({ ...orderDetail, [name]: value })
    }

    function addProduct(event: any) {
        //Preventing default event
        event.preventDefault();

        //Call if changeAmount exist
        if (changeAmount) {
            changeAmount(orderDetail)
        }

        //Update order detail
        setOrderDetail({});
    }
    function OptionProduct({ product }: OptionProductProps) {
        return (
            <option value={product.id}>
                {product.name}
            </option>
        )
    }

    function rowOnclick(orderDetail?: OrderDetail) {
        if (orderDetail) {
            setOrderDetail(orderDetail);
        }
    }

    function OrderDetailRow({ orderDetail, index }: OrderDetailRowProps & { index: number }) {
        return (
            <tr onClick={() => rowOnclick(orderDetail ? orderDetail : undefined)}>
                <td>{index + 1}</td>
                <td>{orderDetail?.product}</td>
                <td>{orderDetail?.amount}</td>
                <td>{orderDetail?.totalPrice}</td>
            </tr>
        )
    }

    //View
    return (
        <div className="from-overlay">
            {/* <form className="orderDetail " onSubmit={addProduct}> */}
            <div className="form-add">
                <form> 
                    <select className="orderItem" name="product" value={orderDetail.product ? orderDetail.product : ""} onChange={onOrderDetailChanged} required >
                        <option value="" hidden>Sản phẩm</option>
                        {
                            productList.map((product, index) => (<OptionProduct key={index} product={product} />))
                        }
                    </select>

                    {/* Amount */}
                    <input className="orderAmout" type="number" name="amount" value={orderDetail.amount ? orderDetail.amount : ""} onChange={onOrderDetailChanged} placeholder="Số lượng" required={true} />

                    {/* Submit */}
                    <button className="btn-add" onClick={addProduct}> Thêm </button>
                </form>

            </div>
            {/* </form> */}

            {/* Table */}
            <div className="tableDetail">
                <table border={1} cellPadding={5} className="productOrder">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>

                    {/* Order Detail Row */}
                    <tbody className="bodyProductOrder">
                        {
                            orderDetails?.map((orderDetail, index) => (
                                <OrderDetailRow key={index} orderDetail={orderDetail} index={index} />
                            ))
                        }
                    </tbody>
                </table><br></br>
            </div>

            <div className="bottom">
                <button className="btn-order">Tạo đơn</button>
            </div>


        </div>
    )
}