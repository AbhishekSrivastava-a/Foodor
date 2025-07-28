import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../src/features/cart/cartSlice'
import { saveCartToLocalStorage } from "../src/utils/localStorage";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state.cart);
});

export default store;
