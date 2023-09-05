import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:'checkout',
    initialState:{shippingAddress:sessionStorage.getItem('shippingAddress')?JSON.parse(sessionStorage.getItem('shippingAddress')):{}},
    reducers:{
        SAVE_SHIPPING_ADDRESS(state,action){
            state.shippingAddress=action.payload
            sessionStorage.setItem('shippingAddress',JSON.stringify(state.shippingAddress))
        }
    }
})
export const {SAVE_SHIPPING_ADDRESS}=checkoutSlice.actions
export default checkoutSlice

export const selectShippingAddress=state=>state.checkout.shippingAddress