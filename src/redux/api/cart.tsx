import API from "./config";
export const addToCart = async (cartFormData: any) =>
  await API.post("/add-to-cart", cartFormData);
export const getCarts = async (id: any) => await API.get(`/carts/${id}`);
export const deleteCart = async (id: any) =>
  await API.delete(`/delete-cart/${id}`);
export const updateCart = async (data: any) =>
  await API.put("/update-cart", data);
