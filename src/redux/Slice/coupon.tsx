import { createSlice } from "@reduxjs/toolkit";

export const couponDetailSlice = createSlice({
  name: "coupon",
  initialState: {
    isCouponAdded: false,
    couponData: [],
    selectedCouponCode: {},
  },
  reducers: {
    setIsCouponAdded: (state, action) => {
      state.isCouponAdded = action.payload;
    },
    setCouponData: (state, action) => {
      state.couponData = action.payload;
    },
    setSelectedCouponCode: (state, action) => {
      state.selectedCouponCode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsCouponAdded, setCouponData, setSelectedCouponCode } =
  couponDetailSlice.actions;

export default couponDetailSlice.reducer;
