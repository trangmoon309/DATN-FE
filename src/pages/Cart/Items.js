import React, { useContext } from "react";
import { CartContext } from "./Cart";
import * as FaIcons from 'react-icons/fa';

const Items = ({ id, title, description, price, img, quantity }) => {
  const { removeItem, increment, decrement } = useContext(CartContext);
  return (
    <>
      <div className="items-info">
        <div className="product-img">
          <img src={img} alt="tp" />
        </div>

        <div className="title">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="add-minus-quantity">
          <i onClick={() => decrement(id)}><FaIcons.FaMinus /></i>
          <input type="text" placeholder={quantity} disabled />
          <i onClick={() => increment(id)}><FaIcons.FaPlus /></i>
        </div>
        <div className="price">
          <h3>{price}</h3>
        </div>
        <div className="remove-item">
          <i
            className="fas fa-trash-alt remove"
            onClick={() => removeItem(id)}></i>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Items;
