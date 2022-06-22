import React from "react";
import * as FaIcons from 'react-icons/fa';

const Items = props => {
  const { content, removeItem, increment, decrement } = props;
  const directoryPath = "http://localhost:3333/vehicle-images/";
  var imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  if(content.vehicle.vehicleImages != null && content.vehicle.vehicleImages.length > 0){
    imgURL = directoryPath + content.vehicle.vehicleImages[0].fileInformationId + ".jpg";
  } 
  return (
    <>
      <div className="items-info">
        <div className="product-img">
          <img src={imgURL} alt="tp" />
        </div>

        <div className="title">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="add-minus-quantity">
          <i onClick={() => decrement(content.id)}><FaIcons.FaMinus /></i>
          <input type="text" placeholder={content.quantity} disabled />
          <i onClick={() => increment(content.id)}><FaIcons.FaPlus /></i>
        </div>
        <div className="price">
          <h3>{content.price}</h3>
        </div>
        <div className="remove-item">
          <i
            className="fas fa-trash-alt remove"
            onClick={() => removeItem(content.id)}></i>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Items;
