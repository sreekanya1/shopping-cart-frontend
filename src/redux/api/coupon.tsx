import API from "./config";
export const getAllCoupons = async () => await API.get("/coupons");
