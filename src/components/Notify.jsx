const Notify=(props)=>{
    return (
        
           <div className={`${props.type==="failure"?' bg-red-400':'bg-green-600 '} py-1 text-white shadow-gray shadow-md  rounded-md w-[100%] align-middle h-8`}>
                <span className="capitalize pr-4">
                    {props.type}
                </span>
                :
                <span>
                    {props.message}
                </span>
           </div>
        
    )
}

export default Notify