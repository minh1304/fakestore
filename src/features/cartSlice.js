import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cart: [],
    count: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    count: 0,
    reducers: {
        addToCart: (state, action) => {
            const newItem = { ...action.payload, amount: 1 };
            const newCart = action.payload;
            const cartIndex = state.cart.findIndex(
                (cart) => cart.id === newCart.id,
            );
            if (cartIndex >= 0) {
                state.cart[cartIndex].amount += 1;
            } else {
                state.cart.push(newItem);
            }
            state.count += 1;
            console.log(state.count);
        },
        getCartTotal: (state) => {
            const totalPrice = state.cart.reduce(
                (cartTotal, cartItem) => {
                    console.log('carttotal', cartTotal);
                    console.log('cartitem', cartItem);
                    const { price, amount } = cartItem;
                    console.log(price, amount);
                    const itemTotal = price * amount;
                    cartTotal.totalPrice += itemTotal;
                    cartTotal.totalQuantity += amount;
                    return cartTotal;
                },
                // {
                //     totalPrice: 0,
                // },
            );
            console.log(totalPrice);
            state.totalPrice = parseInt(totalPrice.toFixed(2));
        },
        clearCart: (state) => {
            state.cart = [];
            state.count = 0;
            return state;
        },
    },
});

export const { addToCart, clearCart, getCartTotal } = cartSlice.actions;
export default cartSlice.reducer;
