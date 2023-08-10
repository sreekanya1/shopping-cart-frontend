import { createSlice } from "@reduxjs/toolkit";

export const cartDetailSlice = createSlice({
  name: "cart",
  initialState: {
    quantity: 0,
    cartData: [],
    cartCount: 0,
  },
  reducers: {
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setCartDetails: (state, action) => {
      state.cartData = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCartDetails, setQuantity, setCartCount } =
  cartDetailSlice.actions;

export default cartDetailSlice.reducer;
