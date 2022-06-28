import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {setCurrentVehicle} from "../../redux/vehicleSlice/vehicleSlice"

function VehicleItem({ vehicle, vehicleImages }) {
  const directoryPath = "http://localhost:3333/vehicle-images/";
  const dispatch = useDispatch();
  const history = useHistory();

  function selectCarHandler() {
    dispatch(setCurrentVehicle(vehicle));
    history.push(`/details/${vehicle.id}`);
  }

  return (
    <div style={{ position: "relative", "width": "33%", "margin-bottom": "55px" }}>
      <img
        className="carImage"
        style={{
          width: "100%",
          height: "80%",
          borderRadius: 8,
          marginTop: "8px",
          marginBottom: "5px",
        }}
        src={vehicleImages[0]?directoryPath + vehicleImages[0].fileInformationId + ".jpg":"https://lasd.lv/public/assets/no-image.png"}
        onClick={selectCarHandler}
      ></img>

      <div
        style={{
          background: "white",
          position: "absolute",
          right: "3em",
          bottom: "0.8em",
          borderRadius: 10,
          boxShadow: "0px 0px 18px 1px rgba(0,0,0,0.98)",
        }}
      >
        <h3 style={{ padding: "5px", fontSize: 18 }}>${vehicle.rentalPrice}/day</h3>
      </div>
      <p style={{ "margin-bottom": "100px", fontSize: 20, "text-align":"center", "font-weight":"bold" }}>${vehicle.name}</p>
    </div>
  );
}

export default VehicleItem;
