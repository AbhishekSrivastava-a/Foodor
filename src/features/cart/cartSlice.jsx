import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the cart slice
const initialState = {
  items: {}, // Use an object to store items by ID for efficient lookups
  totalItems: 0, // Keep track of the total number of items
};

// Create a Redux slice for cart management
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // Reducers specify how the state should change in response to actions
  reducers: {
    // Action to add an item to the cart
    addItem: (state, action) => {
      const item = action.payload;
      // If the item already exists, increment its quantity
      if (state.items[item.id]) {
        state.items[item.id].quantity += 1;
      } else {
        // Otherwise, add the new item with a quantity of 1
        state.items[item.id] = { ...item, quantity: 1 };
      }
      // Increment the total item count
      state.totalItems += 1;
    },
    // Action to remove an item from the cart
    removeItem: (state, action) => {
      const itemId = action.payload;
      // Ensure the item exists before trying to remove it
      if (state.items[itemId]) {
        // Decrement the item's quantity
        state.items[itemId].quantity -= 1;
        // If the quantity drops to zero, remove the item from the cart
        if (state.items[itemId].quantity === 0) {
          delete state.items[itemId];
        }
        // Decrement the total item count
        state.totalItems -= 1;
      }
    },
    // Action to clear all items from the cart
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
    },
  },
});

// Export the action creators for use in components
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Export the reducer to be included in the store
export default cartSlice.reducer;