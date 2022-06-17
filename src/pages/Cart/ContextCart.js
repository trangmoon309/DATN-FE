import React, { useContext } from "react";
import Items from "./Items";
import { Scrollbars } from "react-custom-scrollbars-2";

const ContextCart = props => {
  // cosumer
  const { items, totalAmounts, totalItems, clearCart, removeItem, increment, decrement, submitChangeHandler,submitCheckOutHandler } = props;
  
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
        <div className="card-total">
          <h3>
           Total Cost: <span> {totalAmounts}₹ </span>
          </h3>
          <button onClick={submitChangeHandler}>Save Change</button>
          <button onClick={clearCart} style={{"margin-left":"20px", "background-color":"#861717"}}>Clear Cart</button>
          <button onClick={() => submitCheckOutHandler(true)} style={{"margin-left":"20px", "background-color":"#FF3A06"}}>Checkout</button>
        </div>
      </section>
    </>
  ))
};

export default ContextCart;
