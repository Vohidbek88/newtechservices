import { createSlice } from '@reduxjs/toolkit'
import { setItem } from '../helpers/persistance'
const initialState = {
    isLoading: false,
    isLoggedin: false,
    user: null,
    sign_error: null,
    login_error:null,
}
//hozircha bu yerga kelgani yoq
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUserStart(state) {
            state.isLoading = true

        }, signUserSuccess(state, actions) {
            state.isLoading = false
            state.isLoggedin = true
            state.user = actions.payload
            

        }, signUserFailure(state, actions) {
           
            state.isLoading = false
            state.sign_error = actions.payload
        },
        logout(state) {
            state.isLoggedin = false
            state.user = null
        },
        loginFailure(state,action){
            state.login_error=action.payload
        }

    }
})

export const { signUserFailure, signUserStart, signUserSuccess, logout,loginFailure } = authSlice.actions
export default authSlice.reducer