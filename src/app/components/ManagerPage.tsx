import Image from "next/image";
import Header from "./Header";
import Search from "./Search";


export default function ManagerPage() {
    return (
        <div>
            {/* Left-content */}
            <div className="div-content-left">

                <div className="div-user">
                    <Image
                        src="/user.png"
                        alt="Description of the image"
                        width={50} // Độ rộng của hình ảnh
                        height={50} // Chiều cao của hình ảnh
                    />
                    <h4>Hoàng Khuyến</h4>
                    <label>-- Admin --</label>
                </div>

                <button className="line"></button>
                <div className="nav-manager">
                    <button>Quản lý loại sản phẩm</button>
                    <button>Quản lý sản phẩm</button>
                    <button>Quản lý tài khoản</button>
                    <button>Quản lý đơn hàng</button>
                </div>

            </div>

            {/* Right-content */}
            <div className="div-content-right">
                <Header />
                {/* container */}
                <div className="container">

                    
                    {/* top-div */}
                    <div className="top-div">
                        <label> Quản lý sản phẩm</label>
                        <Search/>
                        <button>Thêm sản phẩm</button>
                    </div>

                    {/* table div */}
                    <div>
                        <table cellPadding={10}>
                            {/* table head */}
                            <thead>
                                <tr>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Loại</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                </tr>
                                
                            </thead>

                            {/* table body */}
                            <tbody>
                                <tr>
                                <td>CF01</td>
                                <td>Cà phê muối</td>
                                <td>Cà phê</td>
                                <td>20000</td>
                                <td>Có muối</td>
                                <td><button className="update">Cập nhật</button></td>
                                <td><button className="delete">Xoá</button></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}