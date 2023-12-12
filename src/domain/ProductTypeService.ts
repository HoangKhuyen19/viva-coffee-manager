    import IProductTypeDBHandler from "../persistent/interfaces/IProductTypeDBHandler";
import { IProductTypeService } from "./interfaces/IProductTypeService";
import IProductService from "./interfaces/IProductService";
import { ProductTypeDBHandler } from "../persistent/dbhandlers/ProductTypeDBHandler";
import ProductType from "./models/ProductType";
import { ProductTypeData } from "../persistent/dtos/ProductTypeData";

export class ProductTypeService implements IProductTypeService {
    //Fields:
    private productTypeDBHandler: IProductTypeDBHandler;
    private productService?: IProductService;
    //Constructor
    public constructor(productService?: IProductService) {
        this.productTypeDBHandler = new ProductTypeDBHandler();
        this.productService = productService;
    }

    //Methods:
    async get(id: string): Promise<ProductType | undefined> {
        //Try getting data
        try {
            var data: ProductTypeData | undefined = await this.productTypeDBHandler.get(id);
        } catch (error) {
            throw error;
        }

        //Data not found
        if (!data) {
            return;
        }

        //Try converting data
        try {
            var product: ProductType = await this.dataToProductType(data);
        } catch (error) {
            throw error;
        }

        //Return
        return product
    }
    async getAll(): Promise<ProductType[]> {
        //trying getting datas
        try {
            var datas: ProductTypeData[] = await this.productTypeDBHandler.getAll();
        } catch (error) {
            throw error;
        }

        //Try converting datas to products
        try {
            var productTypes: ProductType[] = await this.multiDataToProductType(datas);
        } catch (error) {
            throw error;
        }

        //Return
        return productTypes;
    }
    async getByFilter(filter: any): Promise<ProductType[]> {
        //trying getting datas
        try {
            var datas: ProductTypeData[] = await this.productTypeDBHandler.getByFilter(filter);
        } catch (error) {
            throw error;
        }

        //Try converting datas to products
        try {
            var productTypes: ProductType[] = await this.multiDataToProductType(datas);
        } catch (error) {
            throw error;
        }

        //Return
        return productTypes;
    }
    async insert(productType: ProductType): Promise<void> {
        //Converting product type to data
        const productTypeData: ProductTypeData = this.productTypeToData(productType);

        //Try inserting
        try {
            await this.productTypeDBHandler.insert(productTypeData);
        } catch (error) {
            throw error;
        }
    }
    async update(productType: ProductType): Promise<void> {
        //Converting product type to data
        const productTypeData: ProductTypeData = this.productTypeToData(productType);

        //Try updating
        try {
            await this.productTypeDBHandler.update(productTypeData);
        } catch (error) {
            throw error;
        }
    }
    async delete(filter: any): Promise<void> {
        try {
            await this.productTypeDBHandler.delete(filter);
        } catch (error) {
            throw error;
        }
    }

    //Local methods:
    private productTypeToData(productType: ProductType): ProductTypeData {
        return {
            id: productType.Id as string,
            name: productType.Name as string,
        }
    }

    private async dataToProductType(data: ProductTypeData): Promise<ProductType> {
        //Function getProduct Type
        const seft: ProductTypeService = this;

        //Function get product list
        async function getProducts(id: string, productT: ProductType): Promise<void> {
            if (seft.productService) {
                //Get Product list By Fiter: type
                try {
                    productT.Products = await seft.productService.getByFilter({ type: id });
                } catch (error) {
                    throw error;
                }
            }   
        }

        let productType: ProductType = new ProductType();

        //Copy fields:
        productType.Id = data.id;
        productType.Name = data.name;

        //Get product list
        try {
            await getProducts(data.id, productType);
        } catch (error) {
            throw error;
        }
        
        //Return product
        return productType;
    }

    private async multiDataToProductType(datas: ProductTypeData[]): Promise<ProductType[]> {
        const result: ProductType[] = [];

        //Try converting
        try {
            for (const data of datas) {
                result.push(await this.dataToProductType(data))
            }
        } catch (error) {
            throw error;
        }

        //Return
        return result;
    }

    //Getter setter
    public get ProductService(): IProductService | undefined {
        return this.productService;
    }

    public set ProductService(productService: IProductService | undefined) {
        this.productService = productService;
    }
}