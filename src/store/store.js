import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./api-slice"
import currentGeoSlice from "./currentGeo-slice";
import locationSearchSlice  from "./locationsearch-slice";
import listingSlice from "./jobListing-slice";
const store=configureStore({
    reducer:{api:apiSlice.reducer,geo:currentGeoSlice.reducer,location:locationSearchSlice.reducer,listing:listingSlice.reducer}
})
export default store;