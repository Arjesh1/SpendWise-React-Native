import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    showTransactionModal: false,

};
const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        setShowTransactionModal: (state, { payload }) => {
            state.showTransactionModal = payload;
        },

    },
});

const { reducer, actions } = systemSlice;

export const { showTransactionModal } = actions;

export default reducer;