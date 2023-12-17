import Image from "next/image";
import { useEffect, useState } from "react";
import OrderManager from "./OrderManager";
import AccountManager from "./AccountManager";
import ProductManager from "./ProductManager";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faList, faBook, faMugHot, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { ProductTypeManager } from "./ProductTypeManager";

//Type Tab
type Tab = "ProductTypeManager" | "ProductManager" | "AccountManager" | "OrderManager" | null;

export default function ManagerPage() {
    //States:
    const [user, setUser] = useState({ fullName: "", permission: "" })
    const [selectedTab, setSelectedTab] = useState<Tab>(null);
    
    //Event handler:
    const handlerTabClick = (tab: Tab) => {
        setSelectedTab(tab)
    }

    const getTabClass = (tab: Tab) => {
        return tab == selectedTab ? "selectedTab" : "";
    }

    //useEffect:
    useEffect(() => {
        //Get user from sessionStorage
        const userStored = sessionStorage.getItem("user");

        if (userStored) {
            const userData = JSON.parse(userStored);
            setUser({ fullName: userData.fullName, permission: userData.permission })
        }
    },[])

    //View
    return (
        <div>
            {/* Left-content */}
            <div className="div-content-left">
                {/* Header */}
                <div className="div-header" >
                    <label className="viva" onClick={() => handlerTabClick(null)}>Viva Coffee Manager</label>

                </div>
                <div className="div-user">
                    <Image
                        src="/user.png"
                        alt="Description of the image"
                        width={50}
                        height={50}
                    />
                    <h4>{user.fullName}</h4>
                    <label>{user.permission}</label>
                </div>

                <div className="line"></div>

                {/* Navigation */}
                <div className="nav-manager">
                    {/* Button product type manager */}
                    <button onClick={() => handlerTabClick("ProductTypeManager")} className={getTabClass("ProductTypeManager")}>
                        <FontAwesomeIcon icon={faList} className="icon" />
                        Quản lý loại sản phẩm
                    </button>

                    {/* Button product manager */}
                    <button onClick={() => handlerTabClick("ProductManager")} className={getTabClass("ProductManager")}>
                        <FontAwesomeIcon icon={faMugHot} className="icon" />
                        Quản lý sản phẩm
                    </button>

                    {/* Button account manager */}
                    <button onClick={() => handlerTabClick("AccountManager")} className={getTabClass("AccountManager")}>
                        <FontAwesomeIcon icon={faUsers} className="icon" />
                        Quản lý tài khoản
                    </button>

                    {/* Button order manager */}
                    <button onClick={() => handlerTabClick("OrderManager")} className={getTabClass("OrderManager")}>
                        <FontAwesomeIcon icon={faBook} className="icon" />
                        Quản lý đơn hàng
                    </button>

                    <div className="bottom">
                        <div className="line"></div>
                        {/* Button log out */}
                        <button>
                        <FontAwesomeIcon icon={faRightFromBracket} className="icon" /> Đăng xuất
                        </button>
                    </div>
                </div>

            </div>

            {/* Right-content */}
            <div className="div-content-right">
                {selectedTab === null && <div className="img"> </div>}
                {selectedTab === "ProductTypeManager" && <ProductTypeManager/>}
                {selectedTab === "ProductManager" && <ProductManager />}
                {selectedTab === "AccountManager" && <AccountManager />}
                {selectedTab === "OrderManager" && <OrderManager />}
            </div>
        </div>
    );
}