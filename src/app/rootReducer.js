import { combineReducers } from "@reduxjs/toolkit";
import { tenderApi } from "../features/tenderApi";



const rootReducer=combineReducers({
    [tenderApi.reducerPath]:tenderApi.reducer,

})

export default rootReducer