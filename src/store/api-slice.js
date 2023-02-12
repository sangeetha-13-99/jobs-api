import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const apiSlice=createSlice({
    name:'api',
    initialState:{
        query:'developer',
        country:'in',
        error:{type:'',message:''},
        data:[],
        fetchCurrentJob:{},
        location:'Hyderabad,india',
        checked:false,
        sortedData:[],
        loading:false
    },
    reducers:{
        setLoading:function(state,action){
            state.loading=action.payload
        },
        setQuery:function(state,action){
            state.query=action.payload
        },
        setLocation:function(state,action){
            state.location=action.payload
        },
        setCountry:function(state,action){
            state.country=action.payload
        },
        setData:function(state,action){
            state.data=action.payload
        },
        setError:function(state,action){
            state.error.type=action.payload.type
            state.error.message=action.payload.message
        },
        setCurrentJob:function(state,action){
            state.fetchCurrentJob=action.payload
        },
        setCheckbox:function(state,action){
            state.checked=!state.checked
        },
        setSortedData:function(state,action){
            state.sortedData=action.payload
        }

    }
});

export const createSortedDataAction=()=>{
    return ((dispatch,getState)=>{
        const {data,checked}=getState().api
        dispatch(apiSliceActions.setLoading(true))

        if(data.length>0){
            const jobsLists=data.filter((job)=>{
                if(checked && job.jobType==="Full-time"){
                    return true
                }
                if(!checked){
                    return true
                }
                return false
            })
            dispatch(apiSliceActions.setLoading(false))
            dispatch(apiSlice.actions.setSortedData(jobsLists))
        }
    })
}
// set on user typed in main search as well uses for sub search location
export const createApiAction=()=>{
    return (async(dispatch,getState)=>{
        const {query,location,country,checked}=getState().api
        const {activePage}=getState().location
        const  fetchDataFn=async()=>{
            const fetchData=axios.create({
                baseURL:`https://serpapi.com/`,
                headers:{
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const response= await fetchData.get(`/search?engine=google_jobs&api_key=${import.meta.env.VITE_API_KEY}&start=${(activePage-1)*10}&q=${query}&location=${location}&country=${country}`);
            if(!response.statusText==='ok'){
                dispatch(apiSliceActions.setError({type:"failure",message:"something Wrong with search !.:[ "}));
                throw new  Error('oh noo !Api has reached its limit ')
            }
            return response.data;
        }
        
        try{
            dispatch(apiSliceActions.setLoading(true))
            const jobsdata=await fetchDataFn();
            if(jobsdata && jobsdata.jobs_results.length>0){
                const jobsLists=jobsdata.jobs_results.map((job)=>{
                    let details= {
                        jobid:job.job_id,
                        description:job.description,
                        companyName:job.company_name,
                        jobType:job.detected_extensions.schedule_type,
                        posted:job.detected_extensions.posted_at?job.detected_extensions.posted_at:'Today',
                        title:job.title,
                        thumbnail:job.thumbnail?job.thumbnail:"",
                        geo:job.location,
                        relatedLinks:job.related_links,
                        highlight:job.job_highlights?job.job_highlights:''
                    }
                    return details
                })
                dispatch(apiSlice.actions.setData(jobsLists))
            }
            dispatch(apiSliceActions.setLoading(false))

        }
        catch(error){
            dispatch(apiSliceActions.setLoading(false))
            dispatch(apiSliceActions.setError({type:"failure",message:error}));
        }
        
    })
}
export  const apiSliceActions=apiSlice.actions;
export default apiSlice;