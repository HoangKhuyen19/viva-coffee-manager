import { useEffect, useState } from "react";
import Product from "../interfaces/Product";
import OrderDetailPage from "./page/OrderDetailPage";
import OrderDetail from "../interfaces/OrderDetail";
import { ChangAmountsProps} from "./page/OrderPage";


export default function OrderDetailManager({changeAmounts}:  ChangAmountsProps){
    //State:
    const [products, setProducts] = useState<Product[]>([]);
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
    
    //Effect
    useEffect(()=>{
        if (changeAmounts) {
            changeAmounts(orderDetails);
        }
            get();
    },[orderDetails])
    //EventHandler
    async function get() : Promise<void>{
        try {
            //Sending http request
            const response : Response = await fetch("/manager/orderdetail-manager/");

            //Parse response body to json
            const {success, products} : { success: boolean, products: Product[] } = await response.json();

            //If successfully
            if(success){
                setProducts(products);
            }
        } catch (error) {
            alert("Có lỗi");
        }
    }

    async function changeAmountProduct(orderDetailData : OrderDetail) : Promise<void>{

        try {
            var response : Response = await fetch(
                "/manager/orderdetail-manager/changeamount",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            orderID: orderDetailData.orderId,
                            product: orderDetailData.product,
                            amount: orderDetailData.amount,
                        }
                    )
                }
            )
            
            //Parse reponse body to json
            const {success , orderDetail, message} : {success: boolean, orderDetail: OrderDetail, message: string} = await response.json();

            //If successfully
            if(success){
                //Update order details
                setOrderDetails([...orderDetails,orderDetail]);
            }else{
                //If failed
                alert(message)
            }
        } catch (error) {
            throw("Có lỗi trong quá trình xử lý")
        }
    }

    //View
    return(
        <OrderDetailPage productList={products} orderDetails={orderDetails} changeAmount={changeAmountProduct}/>
    )
}