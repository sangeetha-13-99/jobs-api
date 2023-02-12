import { useDispatch } from "react-redux"
import { useRef } from "react"
import { apiSliceActions } from "../store/api-slice";
const Input=()=>{
    const dispatch=useDispatch();
    const inputRef=useRef()

    function searchClickHandler(){
        dispatch(apiSliceActions.setQuery(inputRef.current.value))
        inputRef.current.value=""
    }
   
    return (
        <div className="bg-[url('/src/assets/backgroundImg.png')] w-[100%] h-36 mx-auto rounded-md relative">
            <label className="absolute left-[50%] bg-white top-[50%] rounded-sm translate-x-[-50%] translate-y-[-50%] w-[95%] md:w-[80%] text-left text-sm md:text-md px-2">
                <span className="material-symbols-outlined align-middle text-[#B9BDCF] text-sm md:text-md">work</span>
                <input ref={inputRef} className="w-[65%] md:w-[80%] p-3 md:p-4 placeholder-shown:text-[#B9BDCF] focus:outline-none" placeholder="Title, companies, expertise or benefits"/>
                <button className="w-[28%] md:w-[15%] py-2 px-3 md:py-3 md:px-4 rounded-md text-white bg-[#1E86FF]" onClick={searchClickHandler}>Search</button>
            </label>
        </div>
    )
}

export default Input