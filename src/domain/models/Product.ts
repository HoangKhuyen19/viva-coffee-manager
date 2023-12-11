import ProductType from "./ProductType";

export default class Product{
    //Fields:
    private id?: string;
    private name?: string;
    private type?: ProductType;
    private price?: number;
    private description?: string;

    //Constructor:
    public constructor(id? : string, name?: string, type?: ProductType, price?: number, description?: string){
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.description = description;
    }

    //Methods:
    public get Id() : string | undefined{
        return this.id;
    }

    public set Id(id : string|undefined){
        this.id = id;
    }

    public get Name() : string | undefined{
        return this.name;
    }

    public set Name(name: string|undefined){
        this.name = name;
    }

    public get Type() : ProductType | undefined{
        return this.type;
    }

    public set Type(type: ProductType|undefined){
        this.type = type;
    }

    public get Price(): number | undefined{
        return this.price;
    }

    public set Price(price:number|undefined){
        this.price = price;
    }

    public get Description(): string| undefined{
        return this.description;
    }

    public set Description(description : string | undefined){
        this.description = description;
    }

}