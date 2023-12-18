import { orderService, productService } from "@/domain/ModelService";
import Order from "@/domain/models/Order";
import OrderDetail from "@/domain/models/OrderDetail";
import { NextRequest, NextResponse } from "next/server";
import { OrderDetailData } from "../aliases";
import Product from "@/domain/models/Product";
import ProductData from "../../product-manager/aliases";

export async function GET(request: NextRequest): Promise<NextResponse> {
    //Get url search params
    const url: URLSearchParams = request.nextUrl.searchParams;

    //Get order ID
    const orderID: string | null = url.get("order");

    //Get product list
    const path: any[] = [];
    const products: Product[] = await productService.getAll(path);

    //Converting product to product data
    const productData = products.map((product): ProductData => {
        return {
            id: product.Id,
            name: product.Name,
            price: product.Price,
            type: product.Type?.Name
        }
    })

    //If order ID null
    if (orderID == null || orderID == "undefined") {
        return NextResponse.json(
            {
                success: true,
                products: productData
            }
        )
    }

    //Get order if order id not null
    const order: Order | undefined = await orderService.get(orderID, path);

    //Converting orderDetail to data
    if (order) {
        const orderDetails: OrderDetail[] = order.OrderDetails;

        var orderDetailData = orderDetails.map((orderDetail): OrderDetailData => {
            return {
                orderId: orderDetail.OrderId?.Id,
                product: orderDetail.Product?.Id,
                amount: orderDetail.Amount,
                totalPrice: orderDetail.TotalPrice
            }
        })
        
        //Return 
        return NextResponse.json(
            {
                success: true,
                products: productData,
                orderDetails: orderDetailData
            }
        )
    }


    //Return
    return NextResponse.json({success:false})
}