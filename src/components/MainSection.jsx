import { Routes,Route,Navigate } from 'react-router'
import DashBoard from './DashBoard'
import JobDetails from "./JobDetails"
import { useSelector,useDispatch } from 'react-redux'
import { useEffect,useState } from "react"
import { createApiAction } from "../store/api-slice"

const MainSection=()=>{
    const {query,location,sortedData,country,checked}=useSelector(state=>state.api)
    const [darkMode,setDarkMode]=useState(null)
    const dispatch=useDispatch();
    
    useEffect(()=>{
      dispatch(createApiAction())
    },[dispatch,query,location,country,checked])

    useEffect(()=>{
        const theme=localStorage.getItem('theme')
        if(!theme){
            localStorage.setItem('theme',false)
        }
        else if(theme && darkMode===null){
            theme?
            document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark')
            setDarkMode(theme)
        }
        else{
            darkMode?
            document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark')
            localStorage.setItem('theme',darkMode)
        }
    },[darkMode])
    function darkModeBtnClickHandler(){
        setDarkMode(prev=>!prev)
    }
    return (
        <div>
            <div className='flex justify-between items-center pb-4'>
                <h2 className="text-xl text-left pb-4 dark:text-white"><span className='font-bold'>Job</span> Search</h2>
                <button onClick={darkModeBtnClickHandler} className='relative bg-slate-700 dark:bg-white px-5 h-5 rounded-xl'><span className='inline-block absolute rounded-full h-4 w-4 top-0.5 left-[5%] bg-white dark:bg-zinc-800 dark:left-[55%]'></span></button>
            </div>
            <Routes>
                <Route path="/" element={<Navigate replace to="/job"/>}/>
                <Route path="/job" element={<DashBoard/>}/>
                <Route path="/job/:id" element={<JobDetails/>}/>
            </Routes>
        </div>
    )
}

export default MainSection