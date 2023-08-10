import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Link,
  Grid,
  Box,
  Card,
  Button,
} from "@mui/material";
import style from "./style.module.scss";
import { getProducts } from "../../redux/api/products";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
type productCardProps = {
  productsList: any;
  addToCart: any;
};
const Products: React.FC<productCardProps> = (props) => {
  return (
    <div className={style["product-container"]}>
      <Grid container spacing={3}>
        {props.productsList &&
          props.productsList.length > 0 &&
          props.productsList.map((product: any) => {
            console.log("product data", product);
            return (
              <Grid item sm={12} lg={3} md={3}>
                <Card className={style["product-tail"]}>
                  <Box>
                    <div className={style["product-catalog__img"]}>
                      <img src={product.productImage} />
                    </div>
                    <div className={style["product-catalog__text"]}>
                      <Typography variant="h5">
                        {product.productName}
                      </Typography>
                      <div className={style["product-catalog__price"]}>
                        <span
                          className={`${style["discount-price"]} ${style["product-catalog__content"]}`}
                        >
                          <CurrencyRupeeIcon />
                          <Typography variant="caption">
                            {product.totalDiscountPrice}
                          </Typography>
                        </span>
                        <span
                          className={`${style["fixed-price"]} ${style["product-catalog__content"]}`}
                        >
                          <CurrencyRupeeIcon />
                          <Typography variant="caption">
                            {product.productPrice}
                          </Typography>
                        </span>
                        <div
                          className={`${style["product-offer"]} ${style["product-catalog__content"]}`}
                        >
                          <Typography variant="caption">
                            ({product.discountOffer}% OFF)
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Box>
                  <div className={style["add-to__cart"]}>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => props.addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Products;
