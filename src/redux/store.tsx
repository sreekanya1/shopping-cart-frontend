import { configureStore } from "@reduxjs/toolkit";
import cartDetailReducer from "./Slice/cart";
import couponReducer from "./Slice/coupon";

export default configureStore({
  reducer: {
    cart: cartDetailReducer,
    coupon: couponReducer,
  },
});
