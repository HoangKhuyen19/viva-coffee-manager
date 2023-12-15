import { useState } from "react";
import Search from "../Search";
import Product from "@/app/interfaces/Product";
import ProductType from "@/app/interfaces/ProductType";
import { ProductTypeProps } from "./ProductTypeForm";

//Type
type OnSubmitEventHandler = (fields: any) => void;
type KeyWordEventHandler = (keyword: string) => void;
//Interface
export interface ProductProps {
    productList: Product[];
}

interface ProductTypeSelectProps {
    productType: ProductType;
}

interface ProductRowProps {
    product: Product;
}

interface OnInsertProps {
    onInsert?: OnSubmitEventHandler;
}

interface OnUpdateProps {
    onUpdate?: OnSubmitEventHandler;
}

interface onDeleteProps {
    onDelete?: KeyWordEventHandler;
}

interface onSearchProps {
    onSearch?: KeyWordEventHandler;
}

export default function ProductForm({ productList, productTypes, onInsert, onUpdate, onDelete, onSearch }: ProductProps & ProductTypeProps & OnInsertProps & OnInsertProps & OnUpdateProps & onDeleteProps & onSearchProps) {
    //States:
    const [isFormVisible, setFormVisible] = useState(false);
    const [fields, setFields] = useState<Product>({});
    const [isUpdate, setIsUpdate] = useState(false);

    //Event Handler:
    function displayForm() {
        setFormVisible(true);
    }

    function hiddenForm() {
        setFormVisible(false);

        //Change update state
        setIsUpdate(false);
        setFields({});
    }

    function updateFormVisible(product : Product) {
        //Change state update
        setIsUpdate(true);

        //Display form
        displayForm();
        setFields(product);
    }
    function onFieldsChanged({ target }: any) {
        //Get name
        const name: string = target.name;

        //Get value:
        const value: any = target.value;

        setFields({ ...fields, [name]: value });
    }
    //Product Row
    function ProductRow({ product }: ProductRowProps) {
        return (
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.type}</td>
                <td>{product.description}</td>
                <td>
                    <button className="button-update" onClick={() => updateFormVisible(product)}>CẬP NHẬT</button>
                    <button className="button-delete" onClick={(event)=> lowerDelete(event, (product.id ? product.id : ""))} >XÓA</button>
                </td>
            </tr>
        )
    }

    //Product type form select
    function ProductTypeSelect({ productType }: ProductTypeSelectProps) {
        return (
            <option
                value={productType.id}>{productType.name}
            </option>
        )
    }

    function lowerOnSumit(event: any) {
        //Preventing default event
        event.preventDefault();

        //Call if onInsert exist and state update false
        if (onInsert && !isUpdate) {
            onInsert(fields);
        }

        //Call if onInsert exist and state update true
        if(onUpdate && isUpdate){
            onUpdate(fields);
        }

        setFields({});
        hiddenForm();
    }

    function lowerDelete(event: any, id: string){
        //Preventing default event
        event.preventDefault();

        //Call if onDelete exist
        if(onDelete){
            onDelete(id);
        }
    }

    function lowerSearch(keyword : string){
        //Call if onSearch exist
        if(onSearch){
            onSearch(keyword);
        }
    }

    //View
    return (
        <div>
            {/* Right-content */}

            <div className="form-search">
                <label htmlFor="itemLabel">Quản lý sản phẩm: </label>
                <Search onSearch={lowerSearch}/>
                <button className="button-add" type="button" onClick={displayForm}>Thêm</button>
            </div><br></br>

            {/* Table  */}
            <table border={1} cellPadding={2} id="ProductTable">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Loại</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        productList.map((product: Product) => (
                            <ProductRow
                                key={product.id}
                                product={product}
                            />
                        ))
                    }
                </tbody>
            </table>


            {/* Form */}
            {isFormVisible && (
                <div id="form-add-product">
                    <div className="container-form-account">
                        <form className="form-account" onSubmit={lowerOnSumit}>
                            <span className="close-button-account" onClick={hiddenForm}>X</span>
                            <h2>Thêm sản phẩm</h2>

                            {/* product id */}
                            {!isUpdate && (<input className="product-id" type="text" name="id" value={(fields.id ? fields.id : "")} onChange={onFieldsChanged} placeholder="Mã sản phẩm" required />)}

                            {/* product name */}
                            <input className="product-name" type="text" name="name" value={(fields.name ? fields.name : "")} onChange={onFieldsChanged} placeholder="Tên sản phẩm" required /><br />

                            {/* product price */}
                            <input className="product-price" type="number" name="price" value={(fields.price ? fields.price : "")} onChange={onFieldsChanged} placeholder="Giá" required /><br />

                            {/* product description */}
                            <input className="product-description" type="text" name="description" value={(fields.description ? fields.description : "")} onChange={onFieldsChanged} placeholder="Mô tả" required /><br />

                            {/* product type */}

                            <select className="inputSelect-product" name="type" value={fields.type?fields.type:""} onChange={onFieldsChanged} >
                                {/* Select option defaul */}
                                <option value=""> Loại sản phẩm </option>

                                {/* List option */}
                                {productTypes.map((productType) => (
                                    <ProductTypeSelect key={productType.id} productType={productType} />
                                ))}
                            </select>

                            {/* Submit */}
                            <button className="button-add-account" type="submit">{(isUpdate? "Cập nhật" : "Thêm")}</button> <br />
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

