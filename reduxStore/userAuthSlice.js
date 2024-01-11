import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: {},
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, { payload }) => {
            state.userData = payload;
        },
    },
});

const { reducer, actions } = userSlice;

export const { setUserData } = actions;

export default reducer;