import { useEffect, useRef,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { locationSearchActionFn } from "../store/locationsearch-slice"
import { locationSearchActions } from "../store/locationsearch-slice"
import { apiSliceActions } from "../store/api-slice"

const DashBoardSettings=()=>{
    const dispatch=useDispatch()
    const inputRef=useRef()
    // const checkBoxRef=useRef()
    const [subSearchText,setSubSearchText]=useState('')
    const [search,setSearch]=useState({value:'',type:'none'})
    const {locationsData,location,loading}=useSelector(state=>state.location)
    const {checked}=useSelector(state=>state.api)

    //set location search  location
    useEffect(()=>{
            const timer=setTimeout(()=>dispatch(locationSearchActions.setLocation(subSearchText)),500)
            return (()=>clearTimeout(timer))
    },[subSearchText,dispatch])

    // call api when  location is changed
    useEffect(()=>{
            dispatch(locationSearchActionFn())
    },[location,dispatch])

    // on click of location from options 
    function clickHandler(location,country){
        dispatch(apiSliceActions.setCountry(country))
        dispatch(apiSliceActions.setLocation(location))
        setSearch({value:`${location},${country}`,type:'search'})
        inputRef.current.value=""
        dispatch(locationSearchActions.setLocation(inputRef.current.value))
    }

    //on change 
    function onChangeHandler(){
        if(search.type!=='none'){
            setSearch({value:"",type:'none'})
        }
        setSubSearchText(inputRef.current.value)
    }
    function onCheckBoxChangeHandler(){
        dispatch(apiSliceActions.setCheckbox())
    }

    return (
        <div className="flex items-start flex-col justify-start md:w-[30%] gap-8 ">
            <label >
                <input type="checkbox" name="checkbox" id="checkbox" checked={checked} onChange={onCheckBoxChangeHandler}/>
                <span className="px-2 text-[#334680] dark:text-white">Full time</span>
            </label>
            <label className="flex items-start flex-col justify-start w-[100%]">
                <span className="text-[#B9BDCF] inline-block font-semibold py-4">Location</span>
                <div className="bg-white py-4 px-2 shadow-gray shadow-md w-[100%] text-left rounded-md">
                    <span className="material-symbols-outlined text-[#B9BDCF] align-middle text-sm">public</span>
                    <input type="text" className="placeholder-shown:text-[#B9BDCF] w-[90%] px-2 focus:outline-none text-sm" onChange={onChangeHandler} ref={inputRef} placeholder={search.type==="none" ? "City, state, zip code or country": search.value}/>
                </div>
                <ul className="bg-white px-4 my-[0.5px] shadow-gray shadow-md w-[100%] text-left rounded-md max-h-36 z-10 overflow-auto">
                    {loading && <span className="material-symbols-rounded animate-spin text-[#B9BDCF] relative left-[50%] overflow-hidden" style={{fontSize:'32px'}}>refresh</span>}
                    {!loading && locationsData && locationsData.length>0 && locationsData.map((data)=>{
                        return <li key={data.id} className="py-2 cursor-pointer" onClick={()=>clickHandler(data.name,data.countrycode)}>{`${data.name},${data.countrycode}`}</li>
                    })}
                </ul>
            </label>
        </div>
    )
}

export default DashBoardSettings