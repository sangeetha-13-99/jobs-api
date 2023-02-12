import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { apiSliceActions } from "./api-slice";

const locationSearchSlice=createSlice({
    name:'location',
    initialState:{
        locationsData:[],
        location:"",
        activePage:1,
        loading:false
    },
    reducers:{
        setLoading:function(state,action){
            state.loading=action.payload
        },
        setLocationData:function(state,action){
            state.locationsData=action.payload
        },
        setLocation:function(state,action){
            state.location=action.payload
        },
        setActivePage:function(state,action){
            state.activePage=action.payload
        }
    }
});

export const locationSearchActionFn=()=>{
    return (async(dispatch,getState)=>{
        const location=getState().location.location
        const getLocation=async()=>{
            const locationSearch=axios.create({
                baseURL:`https://serpapi.com/locations.json?q=${location}&limit=5`,
                headers:{
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const response=await locationSearch.get('/');
            if(!response.status==='ok'){
                dispatch(apiSliceActions.setError({type:"failure",message:"something Wrong with search !.:[ "}));
            }
            return response.data
        }
        if(location!==""){
            dispatch(locationSearchSlice.actions.setLoading(true))
            const data=await getLocation();
            if(data && data.length>0){
                const dataObject=data.map(item=>{
                    return {
                        id:item.id,
                        name:item.name,
                        countrycode:item.country_code,
                    }
                })
                dispatch(locationSearchSlice.actions.setLocationData(dataObject))
            }
            dispatch(locationSearchSlice.actions.setLoading(false))
        }
        else{
            dispatch(locationSearchSlice.actions.setLoading(false))
            dispatch(locationSearchSlice.actions.setLocationData([]))
        }

    })
}

export const locationSearchActions=locationSearchSlice.actions
export default locationSearchSlice