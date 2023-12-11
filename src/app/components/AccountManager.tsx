'use client'
import { useState } from "react";
import Search from "./Search";
export default function AccountManager() {

    const [isItemVisible, setItemVisible] = useState(false);

    const showFormItem = () => {
        setItemVisible(true); // Sửa thành true để hiển thị form
    }

    const closeFormItem = () => {
        setItemVisible(false); // Sửa thành false để ẩn form
    }


    return (
        <div>
           
           <div className="form-search">
                <label htmlFor="itemLabel">Quản lý tài khoản: </label>
                    <Search/>
                    <button className="button-add" type="button" onClick={showFormItem}>Thêm</button>
                
            </div><br />

            {/* Bảng  */}
            <table border={1} cellPadding={2} id="AccountTable">

                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>FullName</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>chutan</td>
                        <td>123</td>
                        <td>Vòng Chủ Tân</td>
                        <td>Employee</td>

                        <td>
                            <button className="button-update">CẬP NHẬT</button><br />
                            <button className="button-delete">XÓA</button>
                        </td>
                    </tr>

                </tbody>
            </table>

            {isItemVisible && (
                <div id="form-add-account">
                    <div className="container-form-account">
                        <form className="form-account">
                            <span className="close-button-account" onClick={closeFormItem}>X</span>
                            <h2>Thêm tài khoản</h2>
                            <input className="account-user" type="text" placeholder="Username" required /><br />
                            <input className="account-password" type="text" placeholder="Password" required /><br />
                            <input className="account-fullName" type="text" placeholder="FullName" required /><br />

                            <select className="inputSelect-account" name="Permission" id="Permission">
                                <option value="none"></option>
                                <option value="Admin">Admin</option>
                                <option value="Employee">Employee</option>
                            </select><br />

                            <button className="button-add-account" type="submit">Thêm</button> <br />
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
