import { useState } from "react";
import Search from "../Search";
import User from "@/app/interfaces/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";

//type
type OnSubmitEventHandler = (account : User) => void;
type KeywordEventHandler = (keyword : string) => void;
//interface:
export interface AccountProps {
    accounts: User[];
}
interface AccountRowProps {
    account: User;
}

interface OnInsertProps{
    onInsert? : OnSubmitEventHandler;
}

interface OnUpdateProps{
    onUpdate? : OnSubmitEventHandler;
}

interface OnDeleteProps{
    onDelete? : KeywordEventHandler;
}

interface OnSearchProps{
    onSearch? : KeywordEventHandler;
}
export default function AccountPage({ accounts, onInsert, onUpdate, onDelete, onSearch }: AccountProps & OnInsertProps & OnUpdateProps & OnDeleteProps & OnSearchProps) {
    //States:
    const [isFormVisible, setFormVisible] = useState(false);
    const [fields, setFields] = useState<User>({})
    const [isUpdate, setIsUpdate] = useState(false);
 
    //Event Handler
    function onFieldChanged({target} : any){
        //Get name
        const name: string = target.name;

        //Get value:
        const value: any =  target.value;

        setFields({...fields,[name] : value})
    }
    function displayForm() {
        setFormVisible(true);
    }

    function updateFormVisible(account : User){
        //Change state update
        setIsUpdate(true);

        setFields(account);

        //Display Form 
        displayForm();
    }

    function hiddenForm() {
        setFormVisible(false);
        setFields({})

        //Change if state update is true
        if(isUpdate){setIsUpdate(false)}
    }

    function lowerOnSubmit(event : any){
        //Preventing default event
        event.preventDefault();

        //Call if onInsert exist and isUpdate false
        if(onInsert && !isUpdate){
            onInsert(fields);
        }

        //Call if onUpdate exist and isUpdate true
        if(onUpdate && isUpdate){
            onUpdate(fields)
        }

        hiddenForm();
        setFields({})
    }
    
    function AccountRow({account} : AccountRowProps){
        //State:
        const [passwordVisible, setPasswordVisible] = useState(false);

        //EventHandler
        function password(){
            setPasswordVisible((event) => !event)
        }

        return (
            <tr>
                {/* Account info */}
                <td>{account.username}</td>
                <td>{passwordVisible ? account.password : `************`}
                     <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} onClick={password} className="passwordVisible"/>
                </td>
                <td>{account.fullName}</td>
                <td>{account.permission}</td>

                {/* Action button*/}
                <td>
                    <button className="button-update" onClick={() => updateFormVisible(account)}>
                        CẬP NHẬT
                    </button>
                    <button className="button-delete" 
                        onClick={() => {onDelete ? onDelete(account.username ? account.username : "") : undefined }}>XÓA
                    </button>
                </td>
            </tr>
        )
    }

    return (
        <div>

            <div className="form-search">
                <label htmlFor="itemLabel">Quản lý tài khoản: </label>
                <Search onSearch={(onSearch ? onSearch : undefined)}/>
                <button className="button-add" type="button" onClick={displayForm}>Tạo</button>

            </div><br />

            {/* Bảng  */}
            <table border={1} cellPadding={2} id="AccountTable">

                <thead>
                    <tr>
                        <th>Tên tài khoản</th>
                        <th>Mật khẩu</th>
                        <th>Họ và tên</th>
                        <th>Quyền</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        accounts.map((account) => (
                            <AccountRow key={account.username} account={account}/>
                        ))
                    }
                </tbody>
            </table>

            
            {isFormVisible && (
                <div id="form-add-account">
                    <div className="container-form-account">

                        {/* Form */}
                        <form className="form-account" onSubmit={lowerOnSubmit}>
                            <span className="close-button-account" onClick={hiddenForm}>X</span>
                            <h2> {isUpdate?"Cập nhật tài khoản" : "Tạo tài khoản"}</h2>

                            {/* Username */}
                            {!isUpdate && (<input className="account-user" type="text" name="username" value={(fields.username? fields.username : "")} onChange={onFieldChanged} placeholder="Tên đăng nhập" required />)}

                            {/* Password */}
                            {!isUpdate && (<input className="account-password" type="text" name="password" value={(fields.password? fields.password : "")} onChange={onFieldChanged} placeholder="Mật khẩu" required />)}

                            {/* Fullname */}
                            <input className="account-fullName" type="text" name="fullName" value={(fields.fullName? fields.fullName : "")} onChange={onFieldChanged} placeholder="Họ và tên" required /><br />

                            {/* Permission */}
                            <select className="inputSelect-account" name="permission" value={fields.permission ? fields.permission : ""} onChange={onFieldChanged} required>
                                <option value="" hidden disabled> Quyền </option>
                                <option value="EMPLPOYEE">Employee</option>
                                <option value="ADMIN">Admin</option>
                            </select><br />

                            {/* Submit */}
                            <button className="button-add-account" type="submit">{isUpdate ? "Cập nhật" : "Thêm"}</button> <br />
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
