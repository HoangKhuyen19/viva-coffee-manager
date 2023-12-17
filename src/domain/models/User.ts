import Order from "./Order";

export type UserPermission = "ADMIN" | "EMPLOYEE";

export default class User{
    //Fields
    private username?: string;
    private password?: string;
    private fullName?: string;
    private permission?: UserPermission;

    //dependency
    private orders: Order[];

    //Constructor

    public constructor(username?: string, password?: string, fullName?: string, permission?:UserPermission, orders?: Order[]){
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.permission = permission;
        this.orders = (orders || []);
    }

    //Methods:
    public get Username(): string | undefined{
        return this.username;
    }

    public set Username(username :string | undefined){
        this.username = username;
    }

    public get Password(): string | undefined{
        return this.password; 
    }

    public set Password(password :string | undefined){
        this.password = password;
    }

    public get FullName(): string | undefined{
        return this.fullName; 
    }

    public set FullName(fullName :string | undefined){
        this.fullName = fullName;
    }

    public get Permission(): UserPermission | undefined{
        return this.permission; 
    }

    public set Permission(permission :UserPermission | undefined){
        this.permission = permission;
    }

    public get Orders() : Order[]{
        return this.orders;
    }

    public set Orders(orders: Order[]){
        this.orders = orders;
    }
}