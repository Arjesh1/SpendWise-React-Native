import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    transactionData: [],

};
const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setTransactionData: (state, { payload }) => {
            state.transactionData = payload;
        },
    },
});

const { reducer, actions } = transactionSlice;

export const { setTransactionData } = actions;

export default reducer;