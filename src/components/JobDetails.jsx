import { useSelector } from "react-redux"
import { useLocation } from "react-router";
import JobDetailsSideBar from "./JobDetailsSideBar";
import JobDetailsMainBar from "./JobDetailsMainBar"
import { useEffect } from "react";

const JobDetails=()=>{
    const {state}=useLocation()
    const fetchCurrentJob=useSelector(state=>state.api.fetchCurrentJob)
    return (
        <div>
            {(!state || !state.valid) ? (
                <div>
                    improper access
                </div>
            ):(
                <div className="flex flex-col md:flex-row justify-between items-start w-[100%] gap-8 p-4">
                    <JobDetailsSideBar relatedLinks={fetchCurrentJob.relatedLinks}/>
                    <JobDetailsMainBar {...fetchCurrentJob}/>
                </div>
            )}
        </div>
    )
}

export default JobDetails;