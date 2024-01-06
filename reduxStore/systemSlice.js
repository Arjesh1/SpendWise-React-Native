import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    showTransactionModal: false,
    showCustomModal: false,

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

    },
});

const { reducer, actions } = systemSlice;

export const { setShowTransactionModal, setShowCustomModal } = actions;

export default reducer;