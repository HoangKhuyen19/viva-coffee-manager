import Product from "./Product";

export default class ProductType{
    //FIels:
    private id? : string; 
    private name?: string;
    private products: Product[];
    //Constructor:
    public constructor (id? : string, name?: string, products? : Product[]){
        this.id = id;
        this.name = name;
        this.products = (products || [])
    }

    //Mehthods:
    public get Id(): string|undefined{
        return this.id;
    }

    public set Id(id: string | undefined){
        this.id = id;
    }

    public get Name(): string|undefined{
        return this.name;
    }

    public set Name(name:string | undefined){
        this.name = name;
    }

    public get Products() : Product[]{
        return this.products;
    }

    public set Products(products : Product[] ){
        this.products = products;
    }
}