import { useState } from "react";

export type OnLoginEventHandler = (username: string, password: string) => void;

//Interface:
export interface LoginFormProps {
    onLogin?: OnLoginEventHandler;
}
function LoginForm({onLogin} : LoginFormProps) {
    //States:
    const [fields, setFields] = useState<any>({})

    //Event handlers:
    function onFieldChanged({ target }: any) {
        //Get name:
        const name: string = target.name;

        //Get value:
        const value: string = target.value;

        setFields({ ...fields, [name]: value });
    }

    function lowerOnLogin(event: any) {
        //Prevent Default:
        event.preventDefault();

        //Call if onLogin exist
        if(onLogin){
            onLogin(fields.username,fields.password);
        }

        setFields({})
    }

    //View:
    return (
        <div>
            <div  className="login-container">
                <h1 className="title">Viva Coffee Manager</h1>
                <div className="login-box">
                    <div className="login-div-left">
                    </div>
                    <div className="login-div-right">
                        <label className="lb"> ĐĂNG NHẬP </label>
                        <div className="form-login">
                            <form onSubmit={lowerOnLogin}>
                                {/* Username */}
                                <input type="text" name="username" value={(fields.username ? fields.username : "")} onChange={onFieldChanged} placeholder="Nhập tên người dùng" required={true} />
                                <div className="btn"></div>

                                {/* Password */}
                                <input type="password" name="password" value={(fields.password ? fields.password : "")} onChange={onFieldChanged} placeholder="Nhập mật khẩu" required={true} />
                                <div className="btn"></div>

                                {/* Button Login */}
                                <button
                                    className="btn-login" type="submit">Đăng Nhập</button>
                            </form>
                        </div>
                    </div>
                </div>

                <label className="ft"> Viva Coffee &copy; 12 - 2023 </label>
            </div>
        </div>
    )
}

export default LoginForm;