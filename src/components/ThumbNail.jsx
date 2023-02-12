const ThumbNail=(props)=>{
    return (
        <div className={`relative bg-gray-300 rounded-md h-20 w-24 shadow-gray shadow-sm`}>
            {props.image && <img src={props.image} className="shadow-gray absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-md rounded-md " />}
            {!props.image && <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold">{((props.company).trim())[0]}</p>}
        </div>
    )
}

export default ThumbNail