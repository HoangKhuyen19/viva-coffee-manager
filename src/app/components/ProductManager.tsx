import { useEffect, useState } from "react"
import ProductForm from "./form/ProductForm";
import Product from "../interfaces/Product";
import ProductType from "../interfaces/ProductType";

export default function ProductManager() {
    //States:
    const [productList, setProductList] = useState<Product[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([])

    //use Effect
    useEffect(() => {
        get();
    }, [productList])
    //Method
    async function get(): Promise<void> {
        try {
            var response: Response = await fetch("manager/product-manager");

            //Parse response body to json
            const { success, products, productTypes }: { success: boolean, products: Product[], productTypes: ProductType[] } = await response.json();

            //If get products successully
            if (success) {
                setProductList(products);
                setProductTypes(productTypes);
            } else {
                alert("Không thành công");
            }
        } catch (error) {
            console.error(error);
        }
    }

    //view
    return (
        <div>
            <ProductForm productList={productList} productTypes={productTypes}/>
        </div>
    )
}