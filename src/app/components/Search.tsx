import { useState } from "react"


type OnSearchEventHandler = (keyword: string) => void
interface OnSearchProps{
    onSearch? : OnSearchEventHandler
}
export default function Search({onSearch} : OnSearchProps) {
    //State 
    const [field, setFields] = useState("")

    //Event Handler
    function onFieldChanged({target}: any){
        //Get key
        const keyWord = target.value;

        setFields(keyWord);
    }

    function lowerOnSearch(event : any){
        //Preventing default event
        event.preventDefault();

        //Call if onSearch exist
        if(onSearch){
            onSearch(field);
        }

        setFields("");
    }

    //Views
    return (
        <div className="search">
            <input className="inp-search" type="text" value={field} onChange={onFieldChanged} required/>
            <button className="btn-search" onClick={lowerOnSearch}>Tìm kiếm</button>
        </div>
    )
}