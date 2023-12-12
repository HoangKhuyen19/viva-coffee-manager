    import { useState } from "react";
    import Search from "./Search";
    import ProductType from "@/domain/models/ProductType";


    //Interface:
    export interface ProductTypeProps {
        productTypeList: ProductType[];
    }

    export function ProductTypeManager({ productTypeList }: ProductTypeProps) {
        //States
        const [isItemVisible, setItemVisible] = useState(false);


        //Event handler
        const showFormItem = () => {
            setItemVisible(true); // Sửa thành true để hiển thị form
        }

        const closeFormItem = () => {
            setItemVisible(false); // Sửa thành false để ẩn form
        }
        //View
        return (
            <div>
                <div className="form-search">
                    <label htmlFor="itemLabel">Loại sản phẩm: </label>
                    <Search />

                    <button className="btnitem" type="button" onClick={showFormItem}>Thêm</button>
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
                            productTypeList.map((productType) => (
                                <ProductTypeRow key={productType.Id} productType={productType} />
                            ))
                        }
                    </tbody>
                </table>

                {/* Form add product type */}
                {isItemVisible && (
                    <div className="from-add">
                        <div className="container-itemPoduct">
                            <form className="form-itemProduct">
                                {/* Cancel */}
                                <span className="close-btnitem" onClick={closeFormItem}>X</span>
                                <h3>Loại sản phẩm</h3>

                                {/* Product Type id */}
                                <input className="itemProduct-id" type="text" placeholder="Mã loại" required /><br />

                                {/* Product Type name */}
                                <input className="itemProduct-name" type="text" placeholder="Tên loại" required /><br />

                                {/* Submit */}
                                <button className="button-itemProduct" type="submit">Thêm</button>
                            </form>
                        </div>
                    </div>

                )}
            </div>
        );
    }

    //Product Type Row
    interface ProductTypeRowProps {
        productType: ProductType;
    }

    function ProductTypeRow({ productType }: ProductTypeRowProps) {
        return (
            <tr>
                <td>{productType.Id}</td>
                <td>{productType.Name}</td>
                <td>
                    <button className="button-update">Cập nhập</button>
                    <button className="button-delete">Xóa</button>
                </td>
            </tr>
        )
    }