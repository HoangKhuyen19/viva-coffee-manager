'use client'
import { useState } from "react";
import Search from "./Search";

export default function ProductManager() {
    const [isItemVisible, setItemVisible] = useState(false);

    const showFormItem = () => {
        setItemVisible(true); // Sửa thành true để hiển thị form
    }

    const closeFormItem = () => {
        setItemVisible(false); // Sửa thành false để ẩn form
    }

    return (
        <div>
            {/* Right-content */}
                     
                    <div className="form-search">
                    <label htmlFor="itemLabel">Quản lý sản phẩm: </label>
                    <Search/>
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
                        <tr>
                            <td>01</td>
                            <td>Cà phê muối</td>
                            <td>20.000</td>
                            <td>Cà phê</td>
                            <td>Khá mặn</td>

                            <td>
                                <button className="button-update">CẬP NHẬT</button><br />
                                <button className="button-delete">XÓA</button>
                            </td>
                        </tr>

                    </tbody>
                </table>

                {isItemVisible && (

                    <div id="form-add-product">
                        <div className="container-form-account">
                            <form className="form-account">
                                <span className="close-button-account" onClick={closeFormItem}>X</span>
                                <h2>Thêm sản phẩm</h2>
                                <input className="product-id" type="text" placeholder="Mã sản phẩm" required /><br />
                                <input className="product-name" type="text" placeholder="Tên sản phẩm" required /><br />
                                <input className="product-price" type="number" placeholder="Giá" required /><br />
                                <input className="product-description" type="text" placeholder="Mô tả" required /><br />

                                <select className="inputSelect-product" name="Permission" id="Permission">
                                    <option value="none"></option>
                                    <option value="Admin">ADMIN</option>
                                    <option value="Employee">EMPLOYEE</option>
                                </select><br />

                                <button className="button-add-account" type="submit">Thêm</button> <br />
                            </form>
                        </div>
                    </div>
                )}

            

        </div>
    )
}

