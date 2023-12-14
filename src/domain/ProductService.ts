import { ProductDBHandler } from "../persistent/dbhandlers/ProductDBHandler";
import IProductService from "./interfaces/IProductService";
import Product from "./models/Product";
import { ProductData } from "../persistent/dtos/ProductData";
import IProductDBHandler from "../persistent/interfaces/IProductDBHandler";
import IProductTypeService from "./interfaces/IProductTypeService";


class ProductService implements IProductService{
    //Fields:
    private productDBHandler: IProductDBHandler;
    private productTypeService?: IProductTypeService;
    //Constructor
    public constructor(productTypeService?: IProductTypeService){
        this.productDBHandler = new ProductDBHandler();
        this.productTypeService =  productTypeService;
    }

    //Methods:
    async get(id: string, path : any[]): Promise<Product | undefined> {
        //Try getting data
        try {
            var data : ProductData|undefined = await this.productDBHandler.get(id);
        } catch (error) {
            throw error;
        }

        //Data not found
        if(!data){
            return;
        }
        
        //Try converting data
        try {
            var product : Product = await this.dataToProduct(data, path);
        } catch (error) {
            throw error;
        }

        //Return
        return product;
    }
    async getAll(path : any[]): Promise<Product[]> {
        //trying getting datas
        try {
            var datas : ProductData[] = await this.productDBHandler.getAll();
        } catch (error) {
            throw error;
        }

        //Try converting datas to products
        try {
            var products : Product[] = await this.multiDataToProduct(datas, path);
        } catch (error) {
            throw error;
        }

        //Return
        return products;
    }
    async getByFilter(filter: any, path : any): Promise<Product[]> {
        //trying getting datas
        try {
            var datas : ProductData[] = await this.productDBHandler.getByFilter(filter);
        } catch (error) {
            throw error;
        }

        //Try converting datas to products
        try {
            var products : Product[] = await this.multiDataToProduct(datas, path);
        } catch (error) {
            throw error;
        }

        //Return
        return products;
    }
    async insert(product: Product): Promise<void> {
        //Converting product to data
        const productData : ProductData = this.productToData(product);

        //Try inserting 
        try {
            await this.productDBHandler.insert(productData);
        } catch (error) {
            throw error;
        }
    }
    async update(product: Product): Promise<void> {
        //Converting product to data
        const productData : ProductData = this.productToData(product);

        //Try updating
        try {
            await this.productDBHandler.update(productData);
        } catch (error) {
            throw error;
        }
    }
    async delete(filter: any): Promise<void> {
        try {
            await this.productDBHandler.delete(filter);
        } catch (error) {
            throw error;
        }
    }

    //Local methods:
    private productToData(product : Product): ProductData{
        return{
            id : product.Id as string,
            name: product.Name as string,
            type: (product.Type? product.Type.Id: undefined),
            price : product.Price as number,
            description: product.Description as string
        }
    }

    private async dataToProduct(data: ProductData, path: any[]) : Promise<Product>{
        //Function getProduct Type
        const seft: ProductService = this;

        //Local function:
        function precheck(id: string, path : any[]) : Product|undefined{
            for(const obj of path){
                if(obj instanceof Product){
                    if(obj.Id === id){
                        return obj;
                    }
                }
            }
        }

        async function getProductType(id:string, product: Product, path : any[]) : Promise<void>{
            try {
                if(seft.productTypeService){
                    product.Type = await seft.productTypeService.get(id, path);
                }
            } catch (error) {
                throw error;
            }
            
        }

        //Product declaration
        let product : Product | undefined;

        //Product precheck
        product = precheck(data.id, path);

        //Return if found product in path
        if(product){
            return product;
        }

        //Try converting if not found in path
        product = new Product();

        //Copy fields:
        product.Id = data.id;
        product.Name = data.name;
        product.Price = data.price;
        product.Description = data.description;

        //Path pushing
        path.push(product);
        
        //Dependency handling
        if(data.type){
            await getProductType(data.type,product,path);
        }

        //Return product
        return product;
    }
    
    private async multiDataToProduct(datas: ProductData[], path: any[]) : Promise<Product[]>{
        const result : Product[] = [];

        //Try converting
        try {
            for(const data of datas){
                result.push(await this.dataToProduct(data, path))
            }
        } catch (error) {
            throw error;
        }

        //Return
        return result;
    }

    //Getter setter
    public get ProductTypeService(): IProductTypeService | undefined {
        return this.productTypeService;
    }

    public set ProductTypeService(productTypeService: IProductTypeService | undefined) {
        this.productTypeService = productTypeService;
    }
}

export default ProductService;