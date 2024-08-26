import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    count: 0,
    totalPrice: 0,
    purchased: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        purchased: (state, action) => {
            state.purchased = action.payload;
        },
        addToCart: (state, action) => {
            state.count += 1;
            const newItem = { ...action.payload, amount: 1 };
            const cartIndex = state.cart.findIndex(
                (cart) => cart.Id === newItem.Id,
            );
            if (cartIndex >= 0) {
                state.cart[cartIndex].amount += 1;
                state.totalPrice += state.cart[cartIndex].Price;
            } else {
                state.cart.push(newItem);
                state.totalPrice += newItem.Price;
            }
        },
        removeCart: (state, action) => {
            const itemIndex = state.cart.findIndex(item => item.Id === action.payload);
            if (itemIndex >= 0) {
                state.totalPrice -= state.cart[itemIndex].Price * state.cart[itemIndex].amount;
                state.count -= state.cart[itemIndex].amount;
                state.cart.splice(itemIndex, 1);
            }
        },
        increase: (state, action) => {
            const item = state.cart.find(item => item.Id === action.payload);
            if (item) {
                item.amount += 1;
                state.totalPrice += item.Price;
            }
        },
        decrease: (state, action) => {
            const item = state.cart.find(item => item.Id === action.payload);
            if (item && item.amount > 1) {
                item.amount -= 1;
                state.totalPrice -= item.Price;
            }
        },
        clearCart: (state) => {
            state.cart = [];
            state.count = 0;
            state.totalPrice = 0;
        },
        clearCount: (state) => {
            state.count = 0;
        },
    },
});

export const {
    addToCart,
    clearCart,
    removeCart,
    increase,
    decrease,
    clearCount,
    purchased,
} = cartSlice.actions;
export default cartSlice.reducer;
