import { useDispatch ,useSelector} from "react-redux"
import { locationSearchActions } from "../store/locationsearch-slice"
import { useEffect} from "react";
import { createApiAction } from "../store/api-slice";
const Pagination=()=>{
    const dispatch=useDispatch();
    const {activePage}=useSelector(state=>state.location);
    
    useEffect(()=>{
        dispatch(createApiAction())
    },[activePage])

    function leftBtnClickHandler(){
        if(!(activePage-1<=0)){
            dispatch(locationSearchActions.setActivePage(activePage-1))
        }
    }
    function rightBtnClickHandler(){
            dispatch(locationSearchActions.setActivePage(activePage+1))
    }
    return (
        <div className="flex items-center justify-between w-[20%] mx-auto mt-8">

            <button onClick={leftBtnClickHandler} className="p-1 align-middle border-[1px] rounded-md border-[#1E86FF]"><span className="material-symbols-outlined dark:text-[#B9BDCF] align-middle">chevron_left</span></button>

            <p className='startButton px-3 py-[0.38rem] bg-[#1E86FF] text-white rounded-md text-bold'>{activePage}</p>

            <button onClick={rightBtnClickHandler} className="p-1 align-middle border-[1px] rounded-md border-[#1E86FF]"><span className="material-symbols-outlined align-middle dark:text-[#B9BDCF]">chevron_right</span></button>

        </div>
    )
}

export default Pagination