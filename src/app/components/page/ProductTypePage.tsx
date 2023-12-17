import { useState } from "react";
import ProductType from "../../interfaces/ProductType";
import Search from "../Search";

//Type
type OnSubmitEventHandler = (productType: ProductType) => void;
type KeywordEventHandler = (keyword: string) => void
//Interface:
export interface ProductTypeProps {
    productTypes: ProductType[];
}

interface ProductTypeRowProps {
    productType: ProductType;
}

interface OnInsertProps {
    onInsert?: OnSubmitEventHandler;
}

interface OnUpdateProps {
    onUpdate?: OnSubmitEventHandler;
}

interface OnDeleteProps {
    onDelete?: KeywordEventHandler;
}

interface OnSearchProps {
    onSearch?: KeywordEventHandler
}

export function ProductTypePage({ productTypes, onInsert, onUpdate, onDelete, onSearch }: ProductTypeProps & OnInsertProps & OnUpdateProps & OnDeleteProps & OnSearchProps) {
    //States
    const [isFormVisible, setFormVisible] = useState(false);
    const [fields, setFields] = useState<ProductType>({})
    const [stateUpdate, setStateUpdate] = useState(false);

    //Event handler
    function updateButton(productType: ProductType) {
        //Change state
        setStateUpdate(true);

        //Display form
        displayForm();

        setFields(productType);
    }

    function displayForm() {
        setFormVisible(true);
    }
    function hiddenForm() {
        setFormVisible(false);

        //Set state update false
        setStateUpdate(false);
        setFields({});
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
        if (onUpdate && stateUpdate == true) {
            onUpdate(fields);
        }

        setFields({});
        hiddenForm();
    }

    //View
    return (
        <div>
            <div className="form-search">
                <label htmlFor="itemLabel">Loại sản phẩm: </label>
                <Search onSearch={(onSearch? onSearch : undefined)} />

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
            {isFormVisible && (
                <div className="from-add">
                    <div className="container-itemPoduct">
                        <form className="form-itemProduct" onSubmit={lowerSubmit}>
                            {/* Cancel */}
                            <span className="close-btnitem" onClick={hiddenForm}>X</span>
                            <h3>Loại sản phẩm</h3>

                            {/* Product Type Id */}
                            {!stateUpdate && (<input className="itemProduct-id" type="text" name="id" value={(fields.id ? fields.id : "")} onChange={onFieldsChanged} placeholder="Mã loại" required />)}


                            {/* Product Type Name */}
                            <input className="itemProduct-name" type="text" name="name" value={(fields.name ? fields.name : "")} onChange={onFieldsChanged} placeholder="Tên loại" required /><br />

                            {/* Submit */}
                            <button className="button-itemProduct" type="submit"> {stateUpdate ? "Cập nhật" : "Thêm"}</button>
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

                {/* Action button */}
                <td>
                    <button className="button-update" onClick={() => updateButton(productType)}>Cập nhập</button>
                    
                    <button className="button-delete" 
                        onClick={() => {onDelete ? onDelete(productType.id? productType.id : "") :undefined}}>
                        Xóa
                    </button>
                </td>
            </tr>
        )


    }
}


