import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: {},
    token: '',
    resetData: {},
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, { payload }) => {
            state.userData = payload;
        },
        setToken: (state, { payload }) => {
            state.token = payload;
        },
        setResetData: (state, { payload }) => {
            state.resetData = payload;
        },
    },
});

const { reducer, actions } = userSlice;

export const { setUserData, setToken, setResetData } = actions;

export default reducer;