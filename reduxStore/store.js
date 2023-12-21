import { configureStore } from "@reduxjs/toolkit";
import systemReducer from './systemSlice'
import transactionReducer from './transactionSlice'

const store = configureStore({
    reducer:{
        system: systemReducer,
        transaction: transactionReducer,
    }
})

export default store