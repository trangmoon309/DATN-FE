import React from "react";
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { useDispatch} from "react-redux";
import {
  getVehicleByDate,
} from "../../redux/vehicleSlice/vehicleSlice";

const Items = props => {
  const { content, removeItem, increment, decrement } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const directoryPath = "http://localhost:3333/vehicle-images/";
  const rentDateCallFromCart = localStorage.getItem("searchVehicleDateFromCart");
  var imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";


  if(content.vehicle.vehicleImages != null && content.vehicle.vehicleImages.length > 0){
    imgURL = directoryPath + content.vehicle.vehicleImages[0].fileInformationId + ".jpg";
  } 

  function handleClickItem(vehicleId){
    var path = '/details/'+vehicleId;
    dispatch(getVehicleByDate({id:vehicleId, date:rentDateCallFromCart})).then((res) => {
      history.push({
        pathname: path,
      })
    });
  }

  return (
    <>
      {(content.isRanOut == true) ? <span style={{"margin-right": "2em", "font-weight":"bold", "color": "red", "font-size":"17px"}}>RENT OUT</span> : <></>}
      <div className="items-info">
        <div className="product-img">
          <button onClick={() => (handleClickItem(content.vehicle.id))}>
            <img src={imgURL} alt="tp" />
          </button>
        </div>

        <div className="title">
          <h2>{content.vehicle.name}</h2>
          <p>${content.vehicle.depositPrice}</p>
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
