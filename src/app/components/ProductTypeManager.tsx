import { useEffect, useState } from "react";
import { ProductTypePage } from "./page/ProductTypePage";
import ProductType from "../interfaces/ProductType";

export function ProductTypeManager() {
    //States:
    const [productTypeList, setProductTypeList] = useState<ProductType[]>([]);

    //useEffect
    useEffect(() => {
        get()
    },[])

    //methods
    async function get(): Promise<void> {
        try {
            var response: Response = await fetch("manager/product-type-manager");

            //parse response's body to json
            const { productTypes, success }: { productTypes: ProductType[], success: boolean } = await response.json();

            //If get products successully
            if (success) {
                setProductTypeList(productTypes);
            } else {
                alert("Không thành công")
            }
        } catch (error) {
           alert("CÓ lỗi trong quá trình xử lý")
        }
    }

    async function onInsert(productType: ProductType): Promise<void> {
        try {
            //Sending HTTP Request 
            var response: Response = await fetch(
                "/manager/product-type-manager/add",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            id: productType.id,
                            name: productType.name
                        }
                    )
                }
            )

            //parse response's body to json
            const { success, message }: { success: boolean, message: string } = await response.json()

            //If insert successfully
            if (success) {
                get();
            } else {
                //Insert failed
                alert(message);
            }

        } catch (error) {
            alert(" Có lỗi trong quá trình thêm loại sản phẩm");
        }
    }

    async function onUpdate(productType: ProductType):Promise<void>{
        try {   
            //Try sending HTTP request
            var response : Response = await fetch(
                "/manager/product-type-manager/update",
                {
                    method : "POST",
                    body : JSON.stringify(
                        {
                            id: productType.id,
                            name: productType.name
                        }
                    )
                }
            );
            
            //parse response's body to json
            const {success,message} : {success: boolean, message : string} = await response.json();

            if(success){
                get();
            }else{
                alert(message);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình cập nhật!");
        }
    }

    async function onDelete(id: string) : Promise<void>{
        try {
            //Sending http request
            var response : Response = await fetch(`/manager/product-type-manager/delete?id=${id}`);
            
            //Converting body
            const {success, message} : {success: boolean, message: string} = await response.json();
            //If delete successfully
            if(success){
                get();
            }else{
                //If delete failed
                alert(message);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình xoá");
        }
    }

    async function onSearch(keyword :string) : Promise<void>{
        try {
            //Try sending http request
            var response : Response = await fetch(`/manager/product-type-manager/search?key=${keyword}`);
            
            //Parse response body to json 
            const {success, message, productTypes} : {success: boolean, message: string, productTypes: ProductType[]} = await response.json();

            //If search successfully
            if(success){
                setProductTypeList(productTypes);
            }else{
                alert(message)
            }
        } catch (error) {
            alert("Có lỗi trong quá trình tìm kiếm");
        }
    }
    //Views:
    return (
        <ProductTypePage productTypes={productTypeList} onInsert={onInsert} onUpdate={onUpdate} onDelete={onDelete} onSearch={onSearch}/>
        
    )
}