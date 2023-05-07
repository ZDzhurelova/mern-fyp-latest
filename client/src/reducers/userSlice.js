//Redux toolkit
import { createSlice } from '@reduxjs/toolkit';
// Create slice and export decusers from that slice
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    //Create reducers to show and hide the loader. By calling this functuion the value of the initial state will change
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
});

//Export the alert slice with help of reducers
export const { setUser, reloadUserData } = userSlice.actions;