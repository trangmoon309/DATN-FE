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
  updateUserCart
} from "../../redux/cartSlice/userCartSlice";
import ContextCart from './ContextCart';

const Cart = () => {
  // inPlace of useState we will use the useReducer Hook
  // const [item, setItem] = useState(products);
  const dispatch = useDispatch();
  const userCarts = useSelector(state => state.userCart.items);
  const totalItems = useSelector(state => state.userCart.totalItems);
  const totalAmounts = useSelector(state => state.userCart.totalAmounts);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if(userCarts.length == 0){
      dispatch(getUserCartList({skipCount:0, userId:currentUser.id})).then(res => {
        //console.log(userCarts);
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

  const checkout = () => {
    return dispatch(updateUserCart({
      userId: '3a03c0bf-7649-7d45-9de9-661281763325',
      objects: userCarts,
    }));
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div style={{"margin":"80px"}}>
        <ContextCart
          items={userCarts}
          totalAmounts={totalAmounts}
          totalItems={totalItems}
          clearCart={clearCart}
          removeItem={remove}
          increment={increment}
          decrement={decrement}
          submitHandler={checkout}
        />
      </div>
      <FooterContainer></FooterContainer>
    </div>
  );
};

export default Cart;