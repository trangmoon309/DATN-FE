import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {setCurrentVehicle} from "../../redux/vehicleSlice/vehicleSlice"
import './vehicleListStyle.css'
import * as AiIcons from 'react-icons/ai';

function VehicleItem({ vehicle, vehicleImages }) {
  const directoryPath = "http://localhost:3333/vehicle-images/";
  const dispatch = useDispatch();
  const history = useHistory();

  function selectCarHandler() {
    dispatch(setCurrentVehicle(vehicle));
    history.push(`details/${vehicle.id}`);
  }

  return (
    <div class="featured-car-card">
      <figure class="card-banner">
        <img src={vehicleImages[0]?directoryPath + vehicleImages[0].fileInformationId + ".jpg":"https://lasd.lv/public/assets/no-image.png"}
        onClick={selectCarHandler} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300" class="w-100" />
      </figure>
        <div class="card-content">
          <div class="card-title-wrapper">
            <h3 class="h3 card-title">
              {vehicle.name}
            </h3>

             <data class="year" value="2021">{vehicle.modelYear}</data>
          </div>
          <div class="card-price-wrapper">
            <p class="card-price">
              <strong>${vehicle.rentalPrice}</strong> / day
            </p>

            {/* <button class="btn fav-btn" aria-label="Add to favourite list">
              <AiIcons.AiFillHeart />
            </button> */}

            {/* <button class="btn">Rent now</button> */}
        </div>
      </div>
    </div>
  );
}

export default VehicleItem;
