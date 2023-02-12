import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { apiSliceActions } from "./api-slice";
const listingSlice=createSlice({
    name:'listing',
    initialState:{
        data:[]
    },
    reducers:{
        setData:function(state,action){
            state.data=action.payload
        },
    }
});

// set on user typed in main search as well uses for sub search location
export const createListingAction=(id)=>{
    return (async(dispatch)=>{
        const  fetchListingFn=async()=>{
            const fetchData=axios.create({
                baseURL:`https://serpapi.com/`,
                headers:{
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const response= await fetchData.get(`search?engine=google_jobs_listing&api_key=${import.meta.env.VITE_API_KEY}&q=${id}`);
            if(!response.statusText==='ok'){
                dispatch(apiSliceActions.setError({type:"failure",message:"something Wrong with search !.:[ "}));
                throw new  Error('oh noo !Api has reached its limit ')
            }
            return response.data;
        }
        
        try{
            dispatch(apiSliceActions.setLoading(true))
            const jobsListingdata=await fetchListingFn();
            if(jobsListingdata && jobsListingdata.apply_options.length>0){
                dispatch(listingSlice.actions.setData(jobsListingdata.apply_options))
            }
            dispatch(apiSliceActions.setLoading(false))
            
        }
        catch(error){
            dispatch(apiSliceActions.setLoading(false))
            dispatch(apiSliceActions.setError({type:"failure",message:error}));
        }
        
    })
}
export  const listingSliceActions=listingSlice.actions;
export default listingSlice;