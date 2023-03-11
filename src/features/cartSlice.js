import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const cartSlice  = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            // let find = state.cart.findIndex(
            //     (item) => item.id === action.payload.id,
            // );
            // if (find >= 0) {
            //     state.cart[find].quantity += 1;
            // } else {
            //     state.cart.push(action.payload);
            // }
            state.push(action.payload) 
        },
    },
});

export const {addToCart} = cartSlice.actions;;
export default cartSlice.reducer;