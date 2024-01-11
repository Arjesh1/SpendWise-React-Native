import { configureStore } from "@reduxjs/toolkit";
import systemReducer from './systemSlice'
import transactionReducer from './transactionSlice'
import userReducer from './userAuthSlice'

const store = configureStore({
    reducer:{
        system: systemReducer,
        transaction: transactionReducer,
        user: userReducer,
    }
})

export default store