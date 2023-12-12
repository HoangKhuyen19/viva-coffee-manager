import Order from "./Order";
import Product from "./Product";

export default class OrderDetail{
    //Fields:
    private orderId?: Order;
    private product?: Product;
    private amount?: number;
    private totalPrice?: number;

    //Constructor
    public constructor(orderId?: Order,product?: Product,amount?: number,totalPrice?: number){
        this.orderId = orderId;
        this.product = product;
        this.amount = amount;
        this.totalPrice = totalPrice;
    }

    //Methods:
    public totalPriceCalculate() : number{
        if(this.amount && this.product && this.product.Price){
            return  this.amount * this.product.Price;
        }else{
            return 0;
        }
    }

    //Getter setter
    public get OrderId(): Order | undefined{
        return this.orderId;
    }

    public set OrderId(orderId: Order | undefined){
        this.orderId = orderId;
    }

    public get Product(): Product | undefined{
        return this.product;
    }

    public set Product(product: Product | undefined){
        this.product = product;
    }

    public get Amount(): number | undefined{
        return this.amount;
    }

    public set Amount(amount: number | undefined){
        this.amount = amount;
    }

    public get TotalPrice(): number | undefined{
        return this.totalPrice;
    }

    public set TotalPrice(totalPrice: number | undefined){
        this.totalPrice = totalPrice;
    }
}
