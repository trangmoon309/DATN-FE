import React, { useContext, useState, useEffect } from "react";
import Items from "./Items";
import { Scrollbars } from "react-custom-scrollbars-2";
import FilterBar from "../../components/Filter/FilterBar";
import { useDispatch } from "react-redux";
import {
  getUserCartList,
} from "../../redux/cartSlice/userCartSlice";

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
const ContextCart = props => {
  // cosumer
  const { items, totalItems, removeItem, increment, decrement} = props;
  const [searchDate, setSearchDate] = useState(formatDate(new Date(Date.now())));
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getUserCartList({skipCount:0, userId:currentUser.id, rentDate:searchDate})).then(res => {
    })
    localStorage.setItem("searchVehicleDateFromCart", searchDate);
  }, [searchDate]);

  return (
    items.length === 0 ? (
      <>
      <FilterBar
          isSearchDate={true}
          onChangeSearchDate={setSearchDate}
          searchDateValue={searchDate}
      ></FilterBar>  
      <section className="main-cart-section">
        <p className="total-items">
          you have <span className="total-items-count">{totalItems} </span>
          items in shopping cart
        </p>

        <div className="cart-items">
          <div className="cart-items-container">
            <Scrollbars className="cart-items-container">
              <h1>Empty Cart</h1>
            </Scrollbars>
          </div>
        </div>
      </section>
    </>) : (
      <>
      <FilterBar
          isSearchDate={true}
          onChangeSearchDate={setSearchDate}
          searchDateValue={searchDate}
      ></FilterBar> 
      <section className="main-cart-section">
        <p className="total-items">
          you have<span className="total-items-count">{totalItems}  </span>
          items in shopping cart
        </p>

        <div className="cart-items">
          <div className="cart-items-container">
            <Scrollbars className="cart-items-container">
              {items.map((curItem) => {
                return <Items
                  content={curItem}
                  removeItem={removeItem}
                  increment={increment}
                  decrement={decrement}
                />;
              })}
            </Scrollbars>
          </div>
        </div>
      </section>
    </>
  ))
};

export default ContextCart;
