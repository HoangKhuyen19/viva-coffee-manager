import OrderDetail from "@/app/interfaces/OrderDetail"
import Product from "@/app/interfaces/Product";
import { useMemo } from "react";

type RemoveRowDetailEventHandler = (id: string) => void;
//Interface
export interface OrderDetailsProps {
    orderDetails: OrderDetail[];
}
export interface ProductsProps {
    products: Product[];
}
export interface RemoveRowDetailProps{
    removeDetail? : RemoveRowDetailEventHandler;
}

export default function OrderDetailPage({ orderDetails, products ,removeDetail,detailStatus}: OrderDetailsProps & ProductsProps & RemoveRowDetailProps & {detailStatus : boolean}) {

    //Event Handler
    const getNameProduct = useMemo(() => {
        return (orderDetail: OrderDetail) => {
            const product = products.find((product) => product.id === orderDetail.product);
            return product?.name;
        };
    }, [products]);



    function lowerRemoveDetail(event : any,id : string){
        event.preventDefault();

        if(removeDetail){
            removeDetail(id);
        }
    }
    //View
    return (
        <div className="from-overlay">

            {/* Table */}
            <div className="tableDetail">
                <table border={1} cellPadding={5} className="productOrder">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th></th>
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
    //Local interface
    interface OrderDetailRowProps {
        orderDetail: OrderDetail;
    }

    //Component
    function OrderDertailRow({ orderDetail, index }: OrderDetailRowProps & { index: number }) {
        return (
            <tr> 
                <td>{index + 1}</td>
                <td>{getNameProduct(orderDetail)}</td>
                <td>{orderDetail.amount}</td>
                <td>{orderDetail.totalPrice}</td>
                <td><button onClick={(event) => lowerRemoveDetail(event,orderDetail.product?orderDetail.product : "")} hidden={detailStatus}></button></td>
            </tr>
        )
    }
}


