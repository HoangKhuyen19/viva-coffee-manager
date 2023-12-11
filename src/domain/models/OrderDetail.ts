import Order from "./Order";
import Product from "./Product";

export default class OrderDetail{
    //Fields:
    private orderId: Order;
    private product: Product;
    private amount: number;
    private totalPrice: number;

    //Constructor
    public constructor(orderId: Order,product: Product,amount: number,totalPrice: number){
        this.orderId = orderId;
        this.product = product;
        this.amount = amount;
        this.totalPrice = totalPrice;
    }

    //Methods:
    public get OrderId(): Order{
        return this.orderId;
    }

    public set OrderId(orderId: Order){
        this.orderId = orderId;
    }

    public get Product(): Product{
        return this.product;
    }

    public set Product(product: Product){
        this.product = product;
    }

    public get Amount(): number{
        return this.amount;
    }

    public set Amount(amount: number){
        this.amount = amount;
    }

    public get TotalPrice(): number{
        return this.totalPrice;
    }

    public set TotalPrice(totalPrice: number){
        this.totalPrice = totalPrice;
    }
}
