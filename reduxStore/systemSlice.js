import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    showTransactionModal: false,
    showCustomModal: false,
    showLoader: false,

};
const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        setShowTransactionModal: (state, { payload }) => {
            state.showTransactionModal = payload;
        },
        setShowCustomModal: (state, { payload }) => {
            state.showCustomModal = payload;
        },
        setShowLoader: (state, { payload }) => {
            state.showLoader = payload;
        },

    },
});

const { reducer, actions } = systemSlice;

export const { setShowTransactionModal, setShowCustomModal, setShowLoader } = actions;

export default reducer;