import { useDispatch } from "react-redux"
import { apiSliceActions } from "../store/api-slice"
import { createListingAction } from "../store/jobListing-slice"
import { Link } from "react-router-dom"
import ThumbNail from "./ThumbNail"
const Card=(props)=>{
    const dispatch=useDispatch()
    function clickHandler(){
        dispatch(createListingAction(props.jobId))
        dispatch(apiSliceActions.setCurrentJob(props))
    }

    return (
        <Link to='jobDetails' onClick={clickHandler} state={{valid:true}}>
            <div className="flex items-center justify-between gap-4 p-3 dark:bg-zinc-700 shadow-gray shadow-md rounded-md py-2 my-4">
                <ThumbNail image={props.image} company={props.company}/>
                <div className="flex flex-col text-[#334680] dark:text-[#B9BDCF] w-[100%] text-left gap-y-1 justify-between">
                    <p className="text-xs font-bold ">{props.company}</p>
                    <p className="font-semibold pb-2 text-md dark:text-white">{props.title}</p>
                    <div className="flex flex-col md:flex-row  justify-between items-start gap-2">
                        <p className="border-[1.5px] rounded-md border-[#334680] dark:border-white py-1 px-2 text-sm font-semibold ">{props.jobType}</p>
                        <div className="flex-col flex md:flex-row justify-between align-middle text-sm">
                            <span className="inline-block pr-2"><span className="material-symbols-outlined text-[#B9BDCF] dark:text-white align-middle text-sm pr-2">public</span><span className="text-xs font-semibold text-[#B9BDCF] dark:text-white">{props.location}</span></span>
                            <span className="inline-block"><span className="material-symbols-outlined text-[#B9BDCF] dark:text-white align-middle text-sm pr-2">schedule</span>
                            <span className="text-xs font-semibold text-[#B9BDCF] dark:text-white">{props.posted}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card