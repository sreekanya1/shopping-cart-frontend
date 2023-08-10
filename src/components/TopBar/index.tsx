// TopBar.tsx
import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Grid,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import style from "./style.module.scss";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { setCartCount, setCartDetails } from "../../redux/Slice/cart";
import { getCarts } from "../../redux/api/cart";
import { useDispatch, useSelector } from "react-redux";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pages = ["Products"];
  const userId = localStorage.getItem("userId")?.replace(/"/g, "");
  const { cartData, cartCount } = useSelector((state: any) => state.cart);
  const handleCartPageOpen = () => {
    navigate("/cart");
  };
  const handleNavMenu = () => {
    navigate("/");
  };
  const fetchCartDetails = async () => {
    const cartDetails = await getCarts(userId);
    if (cartDetails && cartDetails.data && cartDetails.data.length > 0) {
      dispatch(setCartDetails([...cartDetails.data]));
      dispatch(setCartCount(cartDetails.data.length || 0));
    }
  };
  useEffect(() => {
    fetchCartDetails();
  }, []);
  return (
    <div className={style["topbar__container"]}>
      <Grid container item md={9} className={style["header-container"]}>
        <AppBar
          position="static"
          className={style["header-container__content"]}
        >
          <Toolbar>
            {" "}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleCartPageOpen}
              >
                <Badge badgeContent={cartCount} color="error">
                  <AddShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Grid>

      <Divider />
    </div>
  );
};

export default TopBar;
