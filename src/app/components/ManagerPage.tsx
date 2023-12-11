import Image from "next/image";
import { useEffect, useState } from "react";
import ProductTypeManager from "./ProductTypeManager";
import OrderManager from "./OrderManager";
import AccountPageManager from "./AccountManager";
import ProductManager from "./ProductManager";

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

    const getTabClass = (tab:Tab) => {
        return tab === selectedTab? "selectedTab":"";
    }

    //useEffect:
    useEffect(() => {
        //Get user from sessionStorage
        const userStored = sessionStorage.getItem("user");

        if (userStored) {
            const userData = JSON.parse(userStored);
            setUser({ fullName: userData.fullName, permission: userData.permission })
        }
    })

    //View
    return (
        <div>
            {/* Left-content */}
            <div className="div-content-left">
                {/* Header */}
                <div className="div-header" >
                    <label className="viva" onClick={()=>handlerTabClick(null)}>Viva Coffee </label>
                    
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
                    <button onClick={() => handlerTabClick("ProductTypeManager")} className={getTabClass("ProductTypeManager")}> Quản lý loại sản phẩm </button>
                    <button onClick={() => handlerTabClick("ProductManager")} className={getTabClass("ProductManager")}>Quản lý sản phẩm</button>
                    <button onClick={() => handlerTabClick("AccountManager")} className={getTabClass("AccountManager")}>Quản lý tài khoản</button>
                    <button onClick={() => handlerTabClick("OrderManager")} className={getTabClass("OrderManager")}>Quản lý đơn hàng</button>
                </div>

            </div>

            {/* Right-content */}
            <div className="div-content-right">
                {/* Display corresponding component*/}
                {selectedTab === "ProductTypeManager" && <ProductTypeManager />}
                {selectedTab === "ProductManager" && <ProductManager />}
                {selectedTab === "AccountManager" && <AccountPageManager />}
                {selectedTab === "OrderManager" && <OrderManager />}
            </div>
        </div>
    );
}