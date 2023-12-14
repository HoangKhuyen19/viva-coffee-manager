'use client'
import { useState } from "react";
import Search from "../Search";
import Product from "@/app/interfaces/Product";
import { ProductTypeProps } from "./ProductTypeForm";
import ProductType from "@/app/interfaces/ProductType";

//Interface
export interface ProductProps {
    productList: Product[];
}

export default function ProductForm({ productList, productTypes }: ProductProps & ProductTypeProps) {
    const [isItemVisible, setItemVisible] = useState(false);

    const showFormItem = () => {
        //Display form
        setItemVisible(true);
    }

    const closeFormItem = () => {
        //Hidden form
        setItemVisible(false);
    }
    return (
        <div>
            {/* Right-content */}

            <div className="form-search">
                <label htmlFor="itemLabel">Quản lý sản phẩm: </label>
                <Search />
                <button className="button-add" type="button" onClick={showFormItem}>Thêm</button>
            </div><br></br>


            {/* Bảng  */}
            <table border={1} cellPadding={2} id="AccountTable">

                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Loại</th>
                        <th>Mô tả</th>
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

            {isItemVisible && (

                <div id="form-add-product">
                    <div className="container-form-account">
                        <form className="form-account">
                            <span className="close-button-account" onClick={closeFormItem}>X</span>
                            <h2>Thêm sản phẩm</h2>

                            {/* product id */}
                            <input className="product-id" type="text" placeholder="Mã sản phẩm" required /><br />

                            {/* product name */}
                            <input className="product-name" type="text" placeholder="Tên sản phẩm" required /><br />

                            {/* product price */}
                            <input className="product-price" type="number" placeholder="Giá" required /><br />

                            {/* product description */}
                            <input className="product-description" type="text" placeholder="Mô tả" required /><br />

                            {/* product type */}

                            <select className="inputSelect-product">
                                {productTypes.map((productType) => (
                                    <ProductTypeSelect key={productType.id} productType={productType} />
                                ))}
                            </select>

                            {/* Submit */}
                            <button className="button-add-account" type="submit">Thêm</button> <br />
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

//Product Row
interface ProductRowProps {
    product: Product;
}

function ProductRow({ product }: ProductRowProps) {
    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.type}</td>
            <td>{product.description}</td>
            <td>
                <button className="button-update">CẬP NHẬT</button><br />
                <button className="button-delete">XÓA</button>
            </td>
        </tr>
    )
}

//Product type form select
interface ProductTypeSelectProps {
    productType: ProductType;
}

function ProductTypeSelect({ productType }: ProductTypeSelectProps) {
    return (
        <option 
            value={productType.id}>{productType.name}
        </option>
    )
}