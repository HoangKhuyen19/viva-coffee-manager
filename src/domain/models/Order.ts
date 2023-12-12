import OrderDetail from "./OrderDetail";
import User from "./User";

export default class Order{
    //Fields:
    private id?: string;
    private date?: Date;
    private totalPrice?: number;
    private createdBy?: User;
    private orderDetails : OrderDetail[];
    
    //Constructor:
    public constructor(id?:string, date?:Date, totalPrice?:number, createdBy?:User, orderDetails?: OrderDetail[]){
        this.id = id;
        this.date = date;
        this.totalPrice = totalPrice;
        this.createdBy = createdBy;
        this.orderDetails = (orderDetails || []);
    }

    //Methods:
    public toltalPriceCalculate(orderDetails : OrderDetail[]):number{
        let toltal = 0;

        for(const orderDetail of orderDetails){
            toltal += orderDetail.totalPriceCalculate();
        }

        return toltal;
    }

    //Getter setter
    public get Id(): string | undefined{
        return this.id;
    }

    public set Id(id: string| undefined){
        this.id = id;
    }

    public get Date(): Date|undefined{
        return this.date;
    }

    public set Date(date: Date){
        this.date = date;
    }

    public get TotalPrice() : number | undefined{
        return this.totalPrice;
    }

    public set TotalPrice(totalPrice:number| undefined){
        this.totalPrice = totalPrice;
    }

    public get CreateBy() : User | undefined{
        return this.createdBy;
    }

    public set CreateBy(createdBy: User| undefined){
        this.createdBy = createdBy;
    }

    public get OrderDetails() : OrderDetail[]{
        return this.orderDetails;
    }

    public set OrderDetails(orderDetails: OrderDetail[]){
        this.orderDetails = orderDetails;
    }
}