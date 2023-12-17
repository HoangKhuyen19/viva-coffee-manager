import OrderDetail from "@/app/interfaces/OrderDetail"
import Product from "@/app/interfaces/Product";
import { useState } from "react"
import { ProductProps } from "./page/ProductPage";



//Type
export type OnInsertEvenHandler = () => void;

//Interface
export interface OnInsertProps{
    onInsert? :OnInsertEvenHandler;
}
//Type
export type ChangeProductAmountEventHandler = (orderDetail: OrderDetail) => void;

//Interface
export interface ChangeAmountProps {
    changeAmount?: ChangeProductAmountEventHandler;
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



export default function OrderDetailPage({ orderDetails, productList, changeAmount, onInsert }: OrderDetailsProps & ProductProps & ChangeAmountProps & OnInsertProps) {
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

        if ((orderDetail.amount || orderDetail.product) === undefined) {
            alert("Vui lòng chọn đủ thông tin để thêm")
        }
        else {
            //Call if changeAmount exist
            if (changeAmount) {
                changeAmount(orderDetail)
            }

            //Update order detail
            setOrderDetail({});
        }
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

    function lowerOnInsert(event: any){
        event.preventDefault();

        if(onInsert){
            onInsert();
        }
    }
    //View
    return (
        <div className="from-overlay">
            <div className="form-add">
                    <select className="orderItem" name="product" value={orderDetail.product ? orderDetail.product : ""} onChange={onOrderDetailChanged} >
                        <option value="" hidden>Sản phẩm</option>
                        {
                            productList.map((product, index) => (<OptionProduct key={index} product={product} />))
                        }
                    </select>

                    {/* Amount */}
                    <input className="orderAmout" type="number" name="amount" value={orderDetail.amount ? orderDetail.amount : ""} onChange={onOrderDetailChanged} placeholder="Số lượng"/>

                    {/* Add Product */}
                    <button className="btn-add" onClick={addProduct}> Thêm </button>

                    {/* Submit */}
                    <div className="bottom">
                        <button className="btn-order" onSubmit={lowerOnInsert} onClick={lowerOnInsert}>Tạo đơn</button>
                    </div>
            </div>


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




        </div>
    )
}