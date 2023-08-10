import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Link,
  Grid,
  Box,
  Card,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
} from "@mui/material";
import style from "./style.module.scss";
import { getProducts } from "../../redux/api/products";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { getCarts, deleteCart, updateCart } from "../../redux/api/cart";
import { setCartCount, setCartDetails } from "../../redux/Slice/cart";
import { setIsCouponAdded } from "../../redux/Slice/coupon";
import { getAllCoupons } from "../../redux/api/coupon";
import { setCouponData } from "../../redux/Slice/coupon";
import CouponModal from "../../components/CouponModal";

const quantityDropdown = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
];
const CartDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state: any) => state.cart);
  console.log("cartDatacartDatacartData", cartData);
  const { couponData, isCouponAdded, selectedCouponCode } = useSelector(
    (state: any) => state.coupon
  );
  const [selectedCartData, setSelectedCartData] = useState(cartData);
  const [quantity, setQuantity] = useState<number>(0);
  const [applyCouponCard, setApplyCouponCard] = useState(false);
  const [applyCouponModalOpen, setApplyCouponModal] = useState(false);
  const userId = localStorage.getItem("userId")?.replace(/"/g, "");

  console.log("cartData", cartData);
  const handleChange = async (
    event: SelectChangeEvent<number>,
    productId: any
  ) => {
    const importedData = [...selectedCartData];
    const newValue = parseInt(String(event.target.value), 10);
    const selectedComponent = selectedCartData.find(
      (product: any) => product._id === productId
    );
    let component = {
      ...selectedComponent,
      quantity: newValue,
    };
    let foundIndex = importedData.findIndex(
      (product: any) => product._id === productId
    );
    importedData[foundIndex] = component;
    setSelectedCartData(importedData);
    dispatch(setCartDetails([...importedData]));
    setQuantity(newValue);
    if (productId) {
      const cartData: any = {
        productId: productId,
        quantity: newValue,
      };
      await updateCart(cartData)
        .then(async (res) => {
          console.log("cartResponse", res);
          if (res.status === 200) {
            const cartDetails = await getCarts(userId);
            if (
              cartDetails &&
              cartDetails.data &&
              cartDetails.data.length > 0
            ) {
              setSelectedCartData([...cartDetails.data]);
              dispatch(setCartDetails([...cartDetails.data]));
            }
          }
        })
        .catch((err) => {
          if (err) {
          }
        });
    }
  };

  const fetchCartDetails = async () => {
    const cartDetails = await getCarts(userId);
    if (cartDetails && cartDetails.data && cartDetails.data.length > 0) {
      cartDetails.data.map((element: any) => {
        if (element.quantity) {
          setQuantity(element.quantity);
        }
      });
      setSelectedCartData([...cartDetails.data]);
      dispatch(setCartDetails([...cartDetails.data]));
    }
  };
  const fetchAllCoupons = async () => {
    const couponData = await getAllCoupons();
    if (couponData && couponData.data && couponData.data.length > 0) {
      couponData.data.map((element: any) => {
        if (element.quantity) {
          setQuantity(element.quantity);
        }
      });
      dispatch(setCouponData([...couponData.data]));
    }
  };
  useEffect(() => {
    fetchCartDetails();
    fetchAllCoupons();
  }, []);

  const handleDeleteCart = async (cartId: any) => {
    await deleteCart(cartId)
      .then(async (res) => {
        console.log("cartResponse", res);
        if (res.status === 200) {
          const cartDetails = await getCarts(userId);
          console.log("deleted cartDetails", cartDetails);
          if (cartDetails && cartDetails.data && cartDetails.data.length > 0) {
            dispatch(setCartDetails([...cartDetails.data]));
            setSelectedCartData([...cartDetails.data]);
          } else {
            dispatch(setCartDetails([]));
            setSelectedCartData([]);
            dispatch(setCartCount(0));
          }
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  };

  const applyCouponModal = () => {
    setApplyCouponModal(!applyCouponModalOpen);
  };
  const handleApplyCouponCard = () => {
    dispatch(setIsCouponAdded(true));
    setApplyCouponCard(!applyCouponCard);
    applyCouponModal();
  };

  const totalMRP = selectedCartData?.reduce(
    (total: any, item: any) =>
      total + Number(item.productPrice || 0) * Number(item.quantity || 0),
    0
  );
  const totalDiscount = selectedCartData?.reduce(
    (total: any, item: any) =>
      total + Number(item.discountAmount || 0) * Number(item.quantity || 0),
    0
  );
  const couponDiscount = selectedCouponCode.offerPrice || 0;
  const totalAmount = totalMRP - totalDiscount - couponDiscount;
  if (selectedCartData && selectedCartData.length === 0) {
    return (
      <div style={{ padding: "12%" }}>
        There is no selected carts please add.
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Container>
          <div className={style["product-container"]}>
            <Grid container spacing={3}>
              <Grid item md={7} lg={7}>
                {selectedCartData &&
                  selectedCartData.length > 0 &&
                  selectedCartData.map((element: any, index: number) => {
                    console.log("element", element);
                    return (
                      <div
                        className={style["cart-details__content"]}
                        key={index}
                      >
                        <Grid container spacing={2}>
                          <Grid item md={3} lg={3}>
                            <div className={style["cart-image"]}>
                              <img src={element?.productImage} />
                            </div>
                          </Grid>
                          <Grid item md={8.5} lg={8.5}>
                            <div className={style["cart-content"]}>
                              <Typography>{element.productName}</Typography>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={
                                  element.quantity !== undefined
                                    ? element.quantity
                                    : ""
                                } // Convert undefined to an empty string
                                onChange={(event: SelectChangeEvent<number>) =>
                                  handleChange(event, element._id)
                                }
                              >
                                {quantityDropdown.map(
                                  (item: any, index: number) => {
                                    return (
                                      <MenuItem value={item.id} key={index}>
                                        {item.name}
                                      </MenuItem>
                                    );
                                  }
                                )}
                              </Select>
                              <span className={style["offer-details"]}>
                                <span
                                  className={style["product-catalog__content"]}
                                >
                                  <CurrencyRupeeIcon />
                                  <Typography variant="caption">
                                    {element.totalDiscountPrice}
                                  </Typography>
                                </span>
                                <span
                                  className={`${style["fixed-price"]} ${style["product-catalog__content"]}`}
                                >
                                  <CurrencyRupeeIcon />
                                  <Typography variant="caption">
                                    {element.productPrice}
                                  </Typography>
                                </span>
                                <div
                                  className={`${style["product-offer"]} ${style["product-catalog__content"]}`}
                                >
                                  <Typography variant="caption">
                                    ({element.discountOffer}% OFF)
                                  </Typography>
                                </div>
                              </span>
                            </div>
                          </Grid>
                          <Grid item md={0.5} lg={0.5}>
                            <div className={style["cart-delete"]}>
                              <CloseOutlinedIcon
                                onClick={() => handleDeleteCart(element._id)}
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })}
              </Grid>
              <Grid item md={0.3} lg={0.3}>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item md={4.7} lg={4.7}>
                <div>
                  <Typography
                    variant="h6"
                    className={style["price-detail-header"]}
                  >
                    Price Details{" "}
                    <span className={style["items-data"]}>
                      ({selectedCartData.length}{" "}
                      {selectedCartData.length > 1 ? "items" : "item"})
                    </span>
                  </Typography>
                  <div className={style["price-details"]}>
                    <div className={style["price-detail__tail"]}>
                      <span>Total MRP</span>
                      <span className={style["price-detail__count"]}>
                        {" "}
                        <CurrencyRupeeIcon />
                        {totalMRP}
                      </span>
                    </div>
                    <div className={style["price-detail__tail"]}>
                      <span>Discount on MRP</span>
                      <span
                        className={`${style["discount-amount"]} ${style["price-detail__count"]}`}
                      >
                        {" "}
                        -<CurrencyRupeeIcon />
                        {totalDiscount}
                      </span>
                    </div>
                    <div className={style["price-detail__tail"]}>
                      <span>Coupon Discount</span>
                      <span
                        className={
                          isCouponAdded
                            ? `${style["discount-amount"]} ${style["price-detail__count"]}`
                            : `${style["price-detail__count"]}`
                        }
                      >
                        {" "}
                        {isCouponAdded ? (
                          <>
                            -<CurrencyRupeeIcon />
                            {}
                            {couponDiscount}
                          </>
                        ) : (
                          <span
                            className={style["apply-coupon"]}
                            onClick={applyCouponModal}
                          >
                            Apply Coupon
                          </span>
                        )}
                      </span>
                    </div>
                    <div
                      className={`${style["total-amount"]} ${style["price-detail__tail"]}`}
                    >
                      <span>Total Amount</span>
                      <span className={style["price-detail__count"]}>
                        {" "}
                        <CurrencyRupeeIcon />
                        {totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            <CouponModal
              applyCouponModalOpen={applyCouponModalOpen}
              applyCouponModal={applyCouponModal}
              couponData={couponData}
              handleApplyCouponCard={handleApplyCouponCard}
            />
          </div>
        </Container>
      </React.Fragment>
    );
  }
};

export default CartDetail;
