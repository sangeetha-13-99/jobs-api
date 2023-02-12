import DashBoardResults from "./DashBoardResults"
import DashBoardSettings from "./DashBoardSettings"
const DashBoardDetails=()=>{
    return (
        <div className="py-8 flex flex-col md:flex-row justify-evenly align-start gap-4 min-h-36">
            <DashBoardSettings/>
            <DashBoardResults/>
        </div>
    )
}

export default DashBoardDetails