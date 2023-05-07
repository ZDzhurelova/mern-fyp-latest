//Redux toolkit
import { createSlice } from '@reduxjs/toolkit';
// Create slice and export recusers from that slice
export const alertsSlice = createSlice({
    name: "alerts",
    initialState: {
        loading : false,
    },
    //Create reducers to show and hide the loader. By calling this functuion the value of the initial state will change
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

//Export the alert slice with help of reducers
export const { showLoading, hideLoading} = alertsSlice.actions;