import React, { useContext } from "react";
import Items from "./Items";
import { Scrollbars } from "react-custom-scrollbars-2";

const ContextCart = props => {
  // cosumer
  const { items, totalItems, removeItem, increment, decrement} = props;
  
  return (
    items.length === 0 ? (
      <>
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
