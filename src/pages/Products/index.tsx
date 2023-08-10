import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import style from "./style.module.scss";
import { getProducts } from "../../redux/api/products";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartCount,
  setCartDetails,
  setQuantity,
} from "../../redux/Slice/cart";
import { getUserData } from "../../redux/api/user";
import { addToCart, getCarts } from "../../redux/api/cart";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const [productsList, setProductsList] = useState([]);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const userId = localStorage.getItem("userId")?.replace(/"/g, "");
  const { quantity, cartCount } = useSelector((state: any) => state.cart);
  const getProductsList = async () => {
    const getProductsData = await getProducts();
    if (
      getProductsData &&
      getProductsData.data &&
      getProductsData.data.length > 0
    ) {
      setProductsList(getProductsData.data);
    }
  };

  const fetchUserData = async () => {
    const userData = await getUserData();
    if (userData && userData.data && userData.data.length > 0) {
      localStorage.setItem("userId", JSON.stringify(userData.data[0]._id));
    }
  };

  const fetchCartDetails = async () => {
    const cartDetails = await getCarts(userId);
    console.log("cartDetails", cartDetails);
    if (cartDetails && cartDetails.data && cartDetails.data.length > 0) {
      dispatch(setCartDetails([...cartDetails.data]));
    }
  };

  useEffect(() => {
    getProductsList();
    if (!userId) {
      fetchUserData();
    }
    fetchCartDetails();
  }, []);

  const handleAddToCart = async (product: any) => {
    setIsAddToCart(true);
    if (product) {
      console.log("product", product);
      const cartFormData: any = {
        ...product,
        quantity: 1,
        userId: userId,
      };
      console.log("cartFormData", cartFormData);
      await addToCart(cartFormData)
        .then(async (res) => {
          console.log("cartResponse", res);
          if (res.status === 200) {
            const cartDetails = await getCarts(userId);
            console.log("cartDetails", cartDetails);
            if (
              cartDetails &&
              cartDetails.data &&
              cartDetails.data.length > 0
            ) {
              dispatch(setCartCount(cartCount + 1));
              dispatch(setCartDetails(cartDetails.data));
            }
          }
        })
        .catch((err) => {
          if (err) {
          }
        });
    }

    // dispatch(
    //   setCartDetails({
    //     ...product,
    //     isAddedToCart: true,
    //     quantity: 1,
    //     userId: userId,
    //   })
    // );
  };

  return (
    <React.Fragment>
      <Container>
        <ProductCard productsList={productsList} addToCart={handleAddToCart} />
      </Container>
    </React.Fragment>
  );
};

export default Products;
