import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: [],
};
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const newOder = { ...action.payload };
            state.order.unshift(newOder);
        },
    },
});
export const { addOrder } = orderSlice.actions;
export const selectOrders = (state) => state.order.order;
export default orderSlice.reducer;
