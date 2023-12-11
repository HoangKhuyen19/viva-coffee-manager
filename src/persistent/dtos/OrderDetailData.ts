export interface  OrderDetailData{
    orderId: string;
    product: string;
    amount: number;
    totalPrice: number;
}

export const orderDetailDataPattern: OrderDetailData = {
    orderId: "",
    product: "",
    amount: 0,
    totalPrice: 0
}