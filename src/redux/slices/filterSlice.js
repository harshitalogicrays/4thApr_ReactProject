import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
    initialState:{filterProducts:[]},
    reducers:{
        FILTER_BY_SEARCH(state,action){
            let {search,products}=action.payload
            let temppro=products.filter((product)=> {
                let {name,category}=product
                return  name.includes(search) || category.includes(search)
            }          
            )
            state.filterProducts=temppro
        }
    }
})

export const {FILTER_BY_SEARCH} = filterSlice.actions
export default filterSlice
export const selectFilterProducts=state=>state.filter.filterProducts