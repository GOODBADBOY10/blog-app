import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        logoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const {loginStart, loginSuccess, loginFailure} = userSlice.actions;
export const {updateStart, 
    updateSuccess, 
    updateFailure, 
    deleteStart, 
    deleteSuccess, 
    deleteFailure, 
    logoutStart, 
    logoutSuccess, 
    logoutFailure} = userSlice.actions;


export default userSlice.reducer;