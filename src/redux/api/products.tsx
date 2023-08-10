import API from "./config";
export const getProducts = async () => await API.get("/products");
