import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../src/features/cart/cartSlice'

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Add the cart reducer to the store
    cart: cartReducer,
  },
});
