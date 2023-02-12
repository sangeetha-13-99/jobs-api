import ThumbNail from "./ThumbNail"
import { useSelector } from "react-redux"

const JobDetailsMainBar=(props)=>{
    const ApplyOptions=useSelector(state=>state.listing.data)
    const buttons=ApplyOptions.map((item)=>{
        return (
            <a key={item.title} target="_blank" className="bg-[#334680] text-white p-2 rounded-md py-2 my-4" href={item.link}>{item.title}</a>
        )
    })
    return (
        <div className="md:w-[70%]">
            <div className="flex flex-col justify-center items-start pb-4">
                <div className="flex gap-4 items-center">
                    <p className="font-semibold text-lg text-[#334680] dark:text-[#B9BDCF]">{props.title}</p>
                    <p className="border-[1.5px] rounded-md text-[#334680] dark:border-white border-[#334680] py-1 px-2 text-sm font-semibold w-[auto] dark:text-[#B9BDCF]">{props.jobType}</p>
                </div>
                <span className="inline-block"><span className="material-symbols-outlined dark:text-white text-[#B9BDCF] align-middle text-sm pr-2">schedule</span>
                <span className="text-xs font-semibold text-[#B9BDCF] dark:text-white">{props.posted}</span></span>
            </div>
            <div >
                <div className="flex justify-between gap-8 items-start pb-4">
                    <ThumbNail image={props.image} company={props.company} />
                    <div className="w-[100%] text-left">
                        <h4 className="text-[#334680] dark:text-[#B9BDCF] font-bold text-md">{props.company}</h4>
                        <span className="inline-block pr-2"><span className="material-symbols-outlined text-[#B9BDCF] dark:text-white align-middle text-sm pr-2">public</span><span className="text-xs font-semibold dark:text-white text-[#B9BDCF]">{props.location}</span></span>
                    </div>
                </div>
                <div>
                    <pre className=" whitespace-pre-wrap text-justify text-[#334680] dark:text-white text-md font-thin">{props.description}</pre>
                    {buttons.length>0 && <p className="text-left text-[#B9BDCF] font-bold pt-4">Apply Here</p>}
                    <div className="flex flex-wrap justify-between items-center">
                        {buttons}
                    </div>
                    <div>
                        { (props.highlight.length > 0)?
                            props.highlight.map(item=>{
                               return  `${item.title}:${item.items}`
                            }):''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetailsMainBar