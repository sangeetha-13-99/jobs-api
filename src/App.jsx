import './App.css'
import MainSection from './components/MainSection'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCurrentGeo } from './store/currentGeo-slice'
import { apiSliceActions } from './store/api-slice'
import { useSelector } from 'react-redux'
import Notify from './components/Notify'

function App() {
  const dispatch=useDispatch();
  const {type,message}=useSelector(state=>state.api.error)


  useEffect(()=>{
    if(type!==""){
      setTimeout(()=>{
        dispatch(apiSliceActions.setError({type:"",message:""}))
      },3000)
    }
  },[type,dispatch])



  useEffect(()=>{
      dispatch(getCurrentGeo())
  },[dispatch])

  return (
    <div className="App w-[100%] min-h-screen border-solid bg-zinc-900 py-8 m-0">
      <div className="w-[95%] mx-auto px-2 md:px-12 py-6 rounded-3xl bg-gray-100 dark:bg-zinc-800 ">
        {message!=="" && <Notify message={message} type={type}/>}
        <MainSection/>
      </div>
      <footer className="text-bold text-[#B9BDCF] pt-4">created by Sangeetha Jula💌 - devChallenges.io</footer>
    </div>
  )
}

export default App
