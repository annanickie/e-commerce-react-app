import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage or use an empty array
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        deleteFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity: (state, action) => {
            const itemToUpdate = state.find(item => item.id === action.payload);
            if (itemToUpdate) {
                itemToUpdate.quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const itemToUpdate = state.find(item => item.id === action.payload);
            if (itemToUpdate && itemToUpdate.quantity > 1) {
                itemToUpdate.quantity--;
            }
        },
    },
});

// Export action creators
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
