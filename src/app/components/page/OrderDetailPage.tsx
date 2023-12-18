import OrderDetail from "@/app/interfaces/OrderDetail"
import Product from "@/app/interfaces/Product";
import { useState } from "react";

type AddProductEventHandler = (orderDetail: OrderDetail) => void;

//Interface
export interface OrderDetailsProps {
    orderDetails: OrderDetail[];
}
export interface ProductsProps {
    products: Product[];
}
export interface AddProductProps {
    onAddProduct?: AddProductEventHandler;
}

export default function OrderDetailPage({ orderDetails, products, onAddProduct }: OrderDetailsProps & ProductsProps & AddProductProps) {
    //State
    const [orderDetail, setOrderDetail] = useState<OrderDetail>({})

    //Event Handler
    function onOrderDetailChanged({ target }: any) {
        //Get name:
        const name: string = target.name;

        //Get value
        const value: any = target.value;

        //Update order detail fields:
        setOrderDetail({ ...orderDetail, [name]: value });
    }
    function rowOnclick(orderDetail?: OrderDetail) {
        if (orderDetail) {
            setOrderDetail(orderDetail);
        }
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


            //Call if onAddProduct exist
            if (onAddProduct) {
                onAddProduct(orderDetail);
            }

            //Update order detail
            setOrderDetail({});
        }
    }
    //View
    return (
        <div className="from-overlay">
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
                            (orderDetails && orderDetails.map((orderDetail, index) => (
                                <OrderDertailRow key={orderDetail.product} orderDetail={orderDetail} index={index} />
                            )))
                        }
                    </tbody>
                </table><br></br>
            </div>
        </div>
    )

    //Component
    function OptionProduct({ product }: OptionProductProps) {
        return (
            <option value={product.id}>
                {product.name}
            </option>
        );
    }

    function OrderDertailRow({ orderDetail, index }: OrderDetailRowProps & { index: number }) {
        return (
            <tr onClick={() => rowOnclick(orderDetail ? orderDetail : undefined)}>
                <td>{index + 1}</td>
                <td>{orderDetail.product}</td>
                <td>{orderDetail.amount}</td>
                <td>{orderDetail.totalPrice}</td>
            </tr>
        )
    }
}

//Local interface
interface OptionProductProps {
    product: Product;
}
interface OrderDetailRowProps {
    orderDetail: OrderDetail;
}

