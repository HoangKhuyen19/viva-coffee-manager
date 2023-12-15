'use client'
import { useState } from "react";
import Search from "./Search";

export default function OrderManager() {
    
    const [isFormVisible, setFormVisible] = useState(false);

    const showForm = () => {
        setFormVisible(true);
    };

    const closeForm = () => {
        setFormVisible(false);
    };

    return (
        <>
            <div>
                <div>

                    <div className="form-search">
                        <label htmlFor="orderSearch">Đơn hàng :</label>
                        <Search />
                        <button className="btn-searchadd" type="button" onClick={showForm}>Thêm</button>
                    </div><br />
                </div>
                <table border={1} cellPadding={5} id="productTable">
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Người tạo</th>
                            <th>Ngày tạo</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>HD01</td>
                            <td>hiếu</td>
                            <td>01/01/2023</td>
                            <td>$100</td>
                            <td>

                                <button className="button-update">Cập nhập</button>
                                <button className="button-delete">Xóa</button>
                            </td>

                        </tr>
                    </tbody>


                </table>
                {isFormVisible && (
                    <div className="from-overlay">
                        <div className="container-oder">
                            <form className="form-oder">
                                <span className="close-btn" onClick={closeForm}>X</span>
                                <h2>Đơn hàng</h2>
                                <input className="orderId" type="text" placeholder="Mã đơn hàng" required />
                                <select className="orderUser">
                                    <option value="noUser">Người tạo</option>
                                    <option>Khuyến</option>
                                    <option>Tân</option>
                                    <option>Hiếu</option>
                                </select><br />
                                <input className="orderDate" type="date" placeholder="Ngày tạo" required /><br />
                                <input className="orderTotal" type="number" placeholder="Tổng tiền" required /><br />
                                <div className="form-add">
                                    <select className="orderItem">
                                        <option value="noItem">Loại sản phẩm</option>
                                        <option></option>
                                        <option></option>
                                    </select>
                                    <input className="orderAmout" type="number" placeholder="Số lượng" required />
                                    <button className="btn-add" type="submit">Thêm</button>
                                </div>
                                <table border={1} cellPadding={5} id="productOrder">
                                    <thead>

                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td>Trà đào</td>
                                            <td>1</td>
                                        </tr>
                                    </tbody>
                                </table><br></br>
                                <button className="btn-order" type="submit">Đặt hàng</button><br />
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
