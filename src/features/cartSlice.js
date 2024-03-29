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
    count: 0,
    reducers: {
        purchased: (state, action) => {
            state.purchased = action.payload;
        },
        addToCart: (state, action) => {
            state.count += 1;
            const newItem = { ...action.payload, amount: 1 };
            const cartIndex = state.cart.findIndex(
                (cart) => cart.id === newItem.id,
            );
            if (cartIndex >= 0) {
                state.cart[cartIndex].amount += 1;
            } else {
                state.cart.push(newItem);
            }
        },
        removeCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload,
            );
        },
        increase: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            });
        },
        decrease: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, amount: item.amount - 1 };
                }
                return item;
            });
        },
        clearCart: (state) => {
            state.cart = [];
            state.count = 0;
            return state;
        },
        clearCount: (state) => {
            state.count = 0;
            return state;
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
