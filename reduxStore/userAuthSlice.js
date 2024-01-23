import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: {},
    token: ''
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
    },
});

const { reducer, actions } = userSlice;

export const { setUserData, setToken } = actions;

export default reducer;