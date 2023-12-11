import OrderDetail from "./OrderDetail";
import User from "./User";

export default class Order{
    //Fields:
    private id?: string;
    private date?: Date;
    private totalPrice?: number;
    private createdBy?: User;
    private orders : OrderDetail[];
    
    //Constructor:
    public constructor(id?:string, date?:Date, totalPrice?:number, createdBy?:User, orders?: OrderDetail[]){
        this.id = id;
        this.date = date;
        this.totalPrice = totalPrice;
        this.createdBy = createdBy;
        this.orders = (orders || []);
    }

    //Methods:
    public get Id(): string | undefined{
        return this.id;
    }

    public set Id(id: string){
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

    public set TotalPrice(totalPrice:number){
        this.totalPrice = totalPrice;
    }

    public get CreateBy() : User | undefined{
        return this.createdBy;
    }

    public set CreateBy(createdBy: User){
        this.createdBy = createdBy;
    }

    public get Orders() : OrderDetail[]{
        return this.orders;
    }

    public set Orders(orders: OrderDetail[]){
        this.orders = orders;
    }
}