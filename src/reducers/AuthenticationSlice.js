import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authentication: [],
        isLoading: false
    },
    reducers: {
        getAuthTokenRequest: (state, action) => {
           // payload = action.payload;
            state.isLoading = true;
        },
        getAuthTokenSuccess: (state, action) => {
            state.authentication = action.payload;
            state.isLoading = false;
        },
        getAuthTokenFailure: (state) => {
            state.isLoading = false;
        }
    }
});

export const { getAuthTokenRequest, getAuthTokenSuccess, getAuthTokenFailure } = authSlice.actions;

export default authSlice.reducer;