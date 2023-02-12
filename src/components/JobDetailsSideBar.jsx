import { Link } from "react-router-dom"
const JobDetailsSideBar=(props)=>{

    return (
        <div className="md:w-[30%]">
            <Link to="/job" >
                <div className="flex items-center justify-start text-[#1E86FF] font-semibold"><span className="material-symbols-outlined pr-2">keyboard_backspace</span><span>Back to search</span></div>
            </Link>
            <p className="text-[#B9BDCF] text-md font-bold py-3 text-left"> Check Out</p>
            <p>
                { (props.relatedLinks.length > 0)?
                    props.relatedLinks.map(item=>{
                    return  <a key={item.text} className="block text-[#1E86FF] font-normal py-1 text-left underline underline-offset-3" href={item.link} target="_blank">{item.text}</a>
                    }):''
                }
            </p>
        </div>
    )
}

export default JobDetailsSideBar