import { useEffect, useState } from "react"
import ProductPage from "./page/ProductPage";
import Product from "../interfaces/Product";
import ProductType from "../interfaces/ProductType";

export default function ProductManager() {
    //States:
    const [productList, setProductList] = useState<Product[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([])

    //use Effect
    useEffect(() => {
        get();
    },[])

    //Function
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
            alert("Có lỗi trong quá trình xử lý")
        }
    }

    async function onInsert(product : Product){
        try {
            //Sending HTTP Request
            var response : Response = await fetch(
                "manager/product-manager/add",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            id: product.id,
                            name: product.name,
                            typeId: product.type,
                            price: product.price,
                            description: product.description
                        }
                    )
                }
            )

            //Parse response body to json
            const { success, message} : { success: boolean, message: string} = await response.json();

            //If insert successfully
            if(success){
                get();
            }else{
                //Insert failed
                alert(message);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình thêm sản phẩm");
        }
    }

    async function onUpdate(product: Product){
        try {
            //Sending http request
            var response : Response =  await fetch(
                "/manager/product-manager/update",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            id: product.id,
                            name: product.name,
                            typeId: product.type,
                            price: product.price,
                            description: product.description
                        }
                    )
                }
            )

            //Parse response body to json
            const { success, message} :{ success: boolean, message: string} = await response.json();

            //Update successfully
            if(success){
                get();
            }else{
                //Update failed
                alert(message);
            }

        } catch (error) {
            alert("Có lỗi trong quá trình cập nhật sản phẩm");
        }
    }

    async function onDelete(id: string){
        try {
            //Sending http request
            var response : Response = await fetch(`/manager/product-manager/delete?id=${id}`)
            
            //Parse reponse body to json
            const { success, message } : { success: boolean, message: string} = await response.json();

            //Delete successfully
            if(success){
                get();
            }else{
                //Delete failed
                alert(message);
            }
        } catch (error) {   
            alert("Có lỗi trong quá trình xoá sản phẩm");
        }
    }

    async function onSearch(keyword : string){
        try {
            //Sending http request
            const response : Response = await fetch(`/manager/product-manager/search?key=${keyword}`)  
            
            //Parse response body to json
            const { success, products } : { success: boolean, products: Product[] } = await response.json();

            //Search succesfully
            if(success){
                setProductList(products);
            }
        } catch (error) {   
            alert("Có lỗi trong quá trình tìm kiếm");
        }
    }
    //view
    return (
        <div>
            <ProductPage productList={productList} productTypes={productTypes} onInsert={onInsert} onUpdate={onUpdate} onDelete={onDelete} onSearch={onSearch}/>
        </div>
    )
}