import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartList: [],
    total: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            state.cartList.push(product);
            state.total += product.price;
        },
        removeFromCart(state, action) {
            const product = action.payload;
            const updatedList = state.cartList.filter(item => item.id !== product.id);
            state.total -= product.price;
            state.cartList = updatedList;
        },
        clearCart(state) {
            state.cartList = [];
            state.total = 0;
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
