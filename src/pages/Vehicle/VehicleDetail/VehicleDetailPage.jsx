import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useHistory} from "react-router";
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import "../../../table.css";
import "./vehicleDetail.css";
import { Colors } from './Colors';
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { FooterContainer } from './../../../components/Footer/FooterContainer';
import * as FaIcons from 'react-icons/fa';
import Popup from '../../../components/Popup';
import VehicleForm from '../../../components/VehicleField/VehicleForm';
import {
  deleteVehicle,
  getVehicleByDate
} from "../../../redux/vehicleSlice/vehicleSlice";

import {
  createUserCart
} from "../../../redux/cartSlice/userCartSlice";


const VehicleDetail = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const directoryPath = "http://localhost:3333/vehicle-images/";
  const [openPopup, setOpenPopup] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentVehicle = useSelector((state) => state.vehicle.currentVehicle);
  const isAdmin = useSelector(state => state.user.admin);
  const { id } = useParams();
  const rentDate = localStorage.getItem("searchVehicleDate");
  function handleDelete(id)
  {
    dispatch(deleteVehicle(id));
    history.push('/vehicle')
  }

  function handleAddToCart(id)
  {
    dispatch(createUserCart({
      userId: currentUser.id,
      vehicleId: id,
      quantity: 1,
      rentDate: rentDate
    }));
    history.push('/vehicle')
  }

  return (
    <div>
      <div style={{"z-index": "2em" }}>
        <NavigationBar></NavigationBar>
      </div>
      <div className="app" style={{"box-shadow": "0 0 5px #ccc"}}>
          <div className="details" key={currentVehicle.id}>
            <div className="big-img" style={{"width": "100%"}}>
              {currentVehicle.vehicleImages.length > 0 ? (
                <AliceCarousel autoPlay autoPlayInterval="3000">
                {currentVehicle.vehicleImages.map((image) => (
                  <img
                    key={image.id}
                    src={directoryPath + image.fileInformationId + ".jpg"}
                    className="sliderimg"
                  />
                ))}
                </AliceCarousel>
              ) : (
                <img src="https://nepalcarsrental.com/assets/images/NoCar.jpg" alt=""/>
              )}
            </div>
            <Popup
              title="Vehicle Detail Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}>
              <VehicleForm
                recordForEdit={true}
                content={currentVehicle} 
                setOpenPopup={setOpenPopup}
              />
            </Popup>
            <div className="box">
              <div className="row">
                <h2>{currentVehicle.name}</h2>
                <span>{currentVehicle.code}</span>
              </div>
              <h4 style={{"margin-bottom": "1px" }}><FaIcons.FaRoad /> Kilometer Traveled: {currentVehicle.kilometerTravel} km</h4>
              <h4 style={{"margin-top": "18px", "margin-bottom": "1px" }}><FaIcons.FaIdCard /> Amount: {currentVehicle.amount} </h4>
              <h4 style={{"margin-top": "18px", "margin-bottom": "1px" }}><FaIcons.FaIdCard /> Remain Amount: {currentVehicle.remainAmount} </h4>
              <h4 style={{"margin-top": "18px", "margin-bottom": "1px" }}><FaIcons.FaMoneyCheck /> Rental Price: {currentVehicle.rentalPrice} $</h4>
              <h4 style={{"margin-top": "18px", "margin-bottom": "1px" }}><FaIcons.FaMoneyBill /> Deposit Price: {currentVehicle.depositPrice} $</h4>
              <h4 style={{"margin-top": "18px", "margin-bottom": "1px" }}><FaIcons.FaCheck /> Vehicle Type: {currentVehicle.vehicleType.name}</h4>
              <h4 style={{"margin-top": "18px", "margin-bottom": "1px" }}><FaIcons.FaCheck /> Vehicel Line: {currentVehicle.vehicleLine.name}</h4>
              <div className="properties">
              <h4 style={{"margin-top": "18px", "margin-bottom": "20px" }}><FaIcons.FaSlidersH /> Properties: {currentVehicle.vehicleProperties.map((prop) =>(<span class="tag-input1">{prop.vehicleTypeDetail.name}</span>))}
              </h4>
              </div>
              {/* <Colors colors={products[0].colors} /> */}

              {/* <p>{currentVehicle.description}</p> */}
              {/* <p>{products[0].colors}</p> */}
              {(currentUser != null) ? <button className="cart" onClick={() => handleAddToCart(currentVehicle.id)} >Add to cart</button> : <></>}
              {(currentUser != null && isAdmin == true) ? <div>
                <button className="cart" style={{"margin-right": "10px", "background-color":"#38A793"}} onClick={() => setOpenPopup(true)}><FaIcons.FaEdit /></button> 
                <button className="cart" style={{"background-color":"#EC7575"}} onClick={() => handleDelete(currentVehicle.id)}><FaIcons.FaTrash /></button>
              </div> : <></>}
            </div>
          </div>
      </div>
      <FooterContainer></FooterContainer>
  </div>
  );
};

export default VehicleDetail;