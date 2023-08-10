import API from "./config";
export const getUserData = async () => await API.get("/user");
