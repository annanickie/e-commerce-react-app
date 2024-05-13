import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Correct import

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Using the cartReducer imported from cartSlice
  },
});
