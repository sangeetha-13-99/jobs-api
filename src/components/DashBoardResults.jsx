import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { createSortedDataAction } from "../store/api-slice"
import Card from "./Card"
import Pagination from "./Pagination"

const DashBoardResults=()=>{
    const dispatch=useDispatch()
    const {data,sortedData,loading:api}=useSelector((state)=>state.api)

    useEffect(()=>{
        dispatch(createSortedDataAction())
    },[data])

    const cards=sortedData.map((item)=>{
        return (<Card key={item.jobid} jobId={item.jobid} company={item.companyName} image={item.thumbnail}posted={item.posted} location={item.geo} jobType={item.jobType} title={item.title} 
        description={item.description} highlight={item.highlight}
        relatedLinks={item.relatedLinks}/>)
    })
    return (
        <div className="my-8 md:my-0 md:w-[70%] h-120">
            {api && <span style={{fontSize:80+ 'px'}} className="material-symbols-rounded text-[#B9BDCF] dark:text-white animate-spin">
clock_loader_60
</span>}
            {!api && cards}
            <Pagination/>
        </div>
    )
}

export default DashBoardResults