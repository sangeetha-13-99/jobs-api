import { createSlice } from "@reduxjs/toolkit";
import { apiSliceActions } from "./api-slice";
import { createApiAction } from "./api-slice";

const currentGeoSlice=createSlice({
    name:'geo',
    initialState:{
        latlong:{},
        currentLocationData:{
            city:'',
            country:'',
            countryCode:''
        }
    },
    reducers:{
        setcurrentGeo:function(state,action){
            const lat=action.payload.lat
            const lon=action.payload.lon
            state.latlong={lat,lon}
        },
        setCurrentLocationData:function(state,action){
            state.currentLocationData=action.payload
        }
    }
});
export const setCurrentCity=()=>{
    return (async(dispatch,getState)=>{
        const lat=`${(getState().geo.latlong.lat).toString()[0]==="-"?"+"+ getState().geo.latlong.lat:"-"+"+"+ getState().geo.latlong.lat}`
        const lon=`${(getState().geo.latlong.lon).toString()[0]==="-"?"+"+ getState().geo.latlong.lon:"-"+"+"+ getState().geo.latlong.lon}`
        const options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
            params: {location: `${lat}${lon}`},
            headers: {
              'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_KEY}`,
              'X-RapidAPI-Host':  `${import.meta.env.VITE_RAPIDAPI_HOST}`
            }
          };

        try{
            const response =await axios.request(options);
            if(response.length>0){
               let location={
                city:response[0].city,
                country:response[0].country,
                countryCode:response[0].countryCode
               }
                Promise.resolve(dispatch(currentGeoSlice.actions.setCurrentLocationData(location))).then(()=>dispatch(apiSliceActions.setLocation(`${location.city}`))).then(()=>apiSliceActions.setCountry(`${location.countryCode}`)
                ).then(()=>dispatch(createApiAction()))
            }
        }
        catch(error){
            dispatch(apiSliceActions.setError({type:"failure",message:"error"}));
        }
        
    })
}
//set on user loading
export const getCurrentGeo=()=>{
    return((dispatch)=>{
        navigator.geolocation.getCurrentPosition(
            function (position) {
               Promise.resolve(
                dispatch(currentGeoSlice.actions.setcurrentGeo({lat:position.coords.latitude, lon:position.coords.longitude}))
                ).then(
                    ()=>dispatch(setCurrentCity())
                ).then(
                    ()=>dispatch(apiSliceActions.setError({type:"success",message:"Fetching Details Based on your location"})
                    )
                )
            },
            function errorCallback() {
                dispatch(apiSliceActions.setError({type:"failure",message:"Unable to fetch Your location"}));
            }
        ); 
          
    })
}

export const currentGeoSliceActions=currentGeoSlice.actions
export default currentGeoSlice