import React, { useState,useEffect } from 'react';
import "./cart.css";
import reducer from "./reducer";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  clearItems,
  getUserCartList,
  removeItem,
  increaseItemAmount,
  decreaseItemAmount,
  updateUserCart,
  createPayment
} from "../../redux/cartSlice/userCartSlice";
import {
  paymentSuccess
} from "../../redux/transactionSlice/userTransactionSlice";
import ContextCart from './ContextCart';
import { useLocation } from 'react-router-dom';
import Popup from '../../components/Popup';
import CheckOutForm from './CheckOutForm';
import { toast } from "react-toastify";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const Cart = () => {
  // inPlace of useState we will use the useReducer Hook
  // const [item, setItem] = useState(products);
  const dispatch = useDispatch();
  const userCarts = useSelector(state => state.userCart.items);
  const totalItems = useSelector(state => state.userCart.totalItems);
  const totalAmounts = useSelector(state => state.userCart.totalAmounts);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [openPopup, setOpenPopup] = useState(false);

  // http://localhost:3000/cart/success?paymentId=1&token=2&PayerID=3
  // http://localhost:3000/cart/success?paymentId=PAYID-MKVCA3Q1PJ376187G961202W&token=EC-8DL16523S4023691H&PayerID=LAXAPG2X2KH94
  let query = useQuery();
  let paymentId = query.get("paymentId");
  let token = query.get("token");
  let PayerID = query.get("PayerID");

  useEffect(() => {
    if(paymentId != null && token != null && PayerID != null){
      toast.success("Paypal checkout successfully!");
      return dispatch(paymentSuccess({paymentId: paymentId, PayerID:PayerID})).then((res) => {
      });
    }
    else{
      dispatch(getUserCartList({skipCount:0, userId:currentUser.id})).then(res => {
      })
    }
  },[]);

  //const [state, dispatch] = useReducer(reducer, initialState);


  const clearCart = () => {
    dispatch(clearItems());
    return dispatch({ type: "CLEAR_CART" });
  };

  const remove = (id) => {
    return dispatch(removeItem({
      type: "REMOVE_ITEM",
      id: id,
    }));
  };

  const increment = (id) => {
    return dispatch(increaseItemAmount({
      type: "INCREMENT",
      id: id,
    }));
  };

  const decrement = (id) => {
    return dispatch(decreaseItemAmount({
      type: "DECREMENT",
      id: id,
    }));
  };

  const submitChangeHandler = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
      return dispatch(updateUserCart({
        userId: currentUser.id,
        objects: userCarts,
      }));
  };

  const submitCheckOut = (total,receivedDate,totalDays) => {
    const result = userCarts.filter(x => x.isRanOut == true);
    setOpenPopup(false);
    if(result.length > 0){
      toast.error("Check out fail: Remove RENT-OUT item from your cart before check out!");
    }
    else{
      dispatch(updateUserCart({
        userId: currentUser.id,
        objects: userCarts,
      })).then((res) => {
        localStorage.setItem("receivedDate", JSON.stringify({data: receivedDate}));
        localStorage.setItem("totalDays", JSON.stringify({data: totalDays}));
        localStorage.setItem("cart", JSON.stringify(userCarts));
        return dispatch(createPayment(total)).then((res) => {
          window.open(res.payload.headers[0].value);
        });
      })
    }
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div style={{"margin":"80px"}}>
        <Popup
          title="Vehicle Line Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <CheckOutForm
            setOpenPopup={setOpenPopup}
            totalAmounts={totalAmounts}
            submitHandler={submitCheckOut}
          />
        </Popup>
        <ContextCart
          items={userCarts}
          totalItems={totalItems}
          removeItem={remove}
          increment={increment}
          decrement={decrement}
        />
        <div className="card-total">
          <h3>
           Total Cost: <span> {totalAmounts}₹ </span>
          </h3>
          <button onClick={submitChangeHandler}>Save Change</button>
          <button onClick={clearCart} style={{"margin-left":"20px", "background-color":"#861717"}}>Clear Cart</button>
          <button onClick={() => setOpenPopup(true)} style={{"margin-left":"20px", "background-color":"#FF3A06"}}>Checkout</button>
        </div>
      </div>
      <FooterContainer></FooterContainer>
    </div>
  );
};

export default Cart;