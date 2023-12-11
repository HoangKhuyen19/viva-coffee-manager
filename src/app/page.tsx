'use client'
import {useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import ManagerPage from "./components/ManagerPage";

function MainPage() {
    //States:
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(false)
    //Effect:
    useEffect(() => {
        //Get user from sessionStorage
        const storedUser = sessionStorage.getItem("user")

        if (storedUser) {
            setUser(true);
        }
        setLoading(true);
    }, []);

    //EventHandler:
    async function onLogin(username: string, password: string): Promise<void> {
        try {
            //Sending HTTP Request
            var response: Response = await fetch(
                "/login",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            username: username,
                            password: password
                        }
                    )
                }
            );

            //Parse response body to json:
            const { success, message, user }: any = await response.json();

            //Login successfully
            if (success) {
                //Save user to sessionStorage
                sessionStorage.setItem("user", JSON.stringify({
                    fullName: user.fullName,
                    permission: user.permission
                }));

                window.location.href = '/'

            } else {
                alert(message);
            }
        } catch (error) {
            alert("Có lỗi trong quá trình xử lý!")
        }
    }

    //view
    if (loading) {
        return (
            <div>
                {
                    (!user)
                        ? <LoginForm onLogin={onLogin} />
                        : <ManagerPage />
                }
            </div>
        )
    }





}

export default MainPage;