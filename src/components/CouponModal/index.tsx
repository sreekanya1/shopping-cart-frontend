import React, { useState } from "react";
import { Dialog, Button, TextField, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import style from "./style.module.scss";
import { setSelectedCouponCode } from "../../redux/Slice/coupon";
import { useDispatch, useSelector } from "react-redux";
type couponCarProps = {
  applyCouponModalOpen: boolean;
  applyCouponModal: any;
  couponData: any[];
  handleApplyCouponCard: any;
};
type Coupon = {
  couponId: string;
  // Add other properties here if needed
};
const CouponModal: React.FC<couponCarProps> = (props) => {
  const dispatch = useDispatch();
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [couponSelected, setCouponSelected] = useState<Coupon | undefined>(
    undefined
  );
  const handleApplyCoupon = (element: any) => {
    setApplyCoupon(true);
    setCouponSelected(element);
    dispatch(setSelectedCouponCode(element));
    // props.applyCouponModal();
  };
  console.log("couponData modal", couponSelected);
  return (
    <div className={style["coupon-dialog"]}>
      <Dialog
        open={props.applyCouponModalOpen}
        onClose={props.applyCouponModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle
          id="alert-dialog-title"
          className={style["coupon-dialog__tail"]}
        >
          <span className=""> Apply Coupon</span>
          <span onClick={props.applyCouponModal}>
            <CloseOutlinedIcon />
          </span>
        </DialogTitle>
        <DialogContent className={style["coupon-dialog__container"]}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter coupon code"
            className={style["coupon-dialog__input"]}
            name="couponId"
            value={
              couponSelected?.couponId !== undefined
                ? couponSelected?.couponId
                : ""
            }
          />
          <div className={style["coupon-dialog__content"]}>
            {props.couponData &&
              props.couponData.length > 0 &&
              props.couponData.map((element: any, index: number) => {
                return (
                  <div className={style["apply-coupon"]} key={index}>
                    <div className={style["coupon-dialog__card"]}>
                      <span>{element.couponId}</span>
                      <Button onClick={() => handleApplyCoupon(element)}>
                        Apply
                      </Button>
                    </div>
                    <div className={style["coupon-dialog__offer"]}>
                      <Typography variant="h6">Save</Typography>
                      <span className={style["coupon-dialog__card"]}>
                        <CurrencyRupeeIcon />
                        <Typography variant="h6">
                          {element.offerPrice}
                        </Typography>
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </DialogContent>
        <DialogActions className={style["coupon-dialog__footer"]}>
          <Button
            onClick={props.handleApplyCouponCard}
            autoFocus
            disabled={!applyCoupon}
            className={style["coupon-dialog__apply-btn"]}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CouponModal;
