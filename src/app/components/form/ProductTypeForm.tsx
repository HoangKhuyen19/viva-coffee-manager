import { useState } from "react";
import ProductType from "../../interfaces/ProductType";
import Search from "../Search";

//Type
type OnSubmitEventHandler = (fields: ProductType) => void;
type OnDeleteEventHandler = (productType: ProductType) => void;
type OnSearchEventHandler = (keyword: string) => void
//Interface:
interface ProductTypeProps {
    productTypes: ProductType[];
}

interface ProductTypeRowProps {
    productType: ProductType;
}

interface OnInsertProps {
    onInsert?: OnSubmitEventHandler;
}

interface OnUpdateProps{
    onUpdate?: OnSubmitEventHandler;
}

interface OnDeleteProps {
    onDelete?: OnDeleteEventHandler;
}

interface OnSearchProps{
    onSearch? : OnSearchEventHandler
}

export function ProductTypeForm({ productTypes, onInsert, onUpdate ,onDelete, onSearch }: ProductTypeProps & OnInsertProps & OnUpdateProps & OnDeleteProps & OnSearchProps) {
    //States
    const [isItemVisible, setItemVisible] = useState(false);
    const [fields, setFields] = useState<ProductType>({})
    const [stateUpdate, setStateUpdate]  = useState(false);

    //Event handler
    function updateButton(productType : ProductType){
        //Change state
        setStateUpdate(true);

        //Display form
        displayForm();

        setFields(productType);
    }
    function displayForm() {
        //Hidden form if state true
        if(isItemVisible){
            setItemVisible(false);

            //Set state update false
            setStateUpdate(false);
            setFields({});
        }else{
            //Show form if state false
            setItemVisible(true);
        }
    }
    function onFieldsChanged({ target }: any) {
        //Get name:
        const name: string = target.name;

        //Get value:
        const value: string = target.value;

        //Update fields object
        setFields({ ...fields, [name]: value })
    }
    function lowerSubmit(event: any) {
        //Preventing default event
        event.preventDefault();

        //Call if onInsert exist
        if (onInsert && stateUpdate == false) {
            onInsert(fields);
        }
        if(onUpdate && stateUpdate == true) {
            onUpdate(fields);
        }

        setFields({});
        displayForm();
    }

    function lowerDelete(event: any, productType: ProductType) {
        //Preventing default event
        event.preventDefault();

        //Call if onDelete exits
        if (onDelete) {
            onDelete(productType);
        }
    }
    function lowerOnSearch(keyword: string){
        if(onSearch){
            onSearch(keyword);
        }
    }

    //View
    return (
        <div>
            <div className="form-search">
                <label htmlFor="itemLabel">Loại sản phẩm: </label>
                <Search onSearch={lowerOnSearch}/>

                <button className="btnitem" type="button" onClick={displayForm}>Thêm</button>
            </div>


            {/* Table info product type */}
            <table border={1} cellPadding={2} id="itemTable">
                <thead>
                    <tr>
                        <th>Mã loại sản phẩm</th>
                        <th>Tên loại sản phẩm</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productTypes.map((productType: ProductType) => (
                            <ProductTypeRow
                                key={productType.id}
                                productType={productType}
                            />
                        ))
                    }
                </tbody>
            </table>

            {/* Form add product type */}
            {isItemVisible && (
                <div className="from-add">
                    <div className="container-itemPoduct">
                        <form className="form-itemProduct"  onSubmit={lowerSubmit}>
                            {/* Cancel */}
                            <span className="close-btnitem" onClick={displayForm}>X</span>
                            <h3>Loại sản phẩm</h3>

                            {/* Product Type Id */}
                            {!stateUpdate && ( <input className="itemProduct-id" type="text" name="id" value={(fields.id ? fields.id : "")} onChange={onFieldsChanged} placeholder="Mã loại" required />)}
                               
                            
                            {/* Product Type Name */}
                            <input className="itemProduct-name" type="text" name="name" value={(fields.name ? fields.name : "")} onChange={onFieldsChanged} placeholder="Tên loại" required /><br />

                            {/* Submit */}
                            <button className="button-itemProduct" type="submit"> {stateUpdate? "Cập nhật" :  "Thêm" }</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

    function ProductTypeRow({ productType }: ProductTypeRowProps) {
        return (
            <tr>
                <td>{productType.id}</td>
                <td>{productType.name}</td>
                <td>
                    <button className="button-update" onClick={() => updateButton(productType)}>Cập nhập</button>
                    <button className="button-delete" onClick={(event) => lowerDelete(event,productType)}>Xóa</button>
                </td>
            </tr>
        )
        
    
    }
}


