import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setCurrentCar } from "../../redux/carSlice/carSlice";

function CarItem({ car, carImages }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [shownCarImage, setShownCarImage] = useState({});

  useEffect(() => {
    carImages.forEach(carImage => {
      if(carImage.car.id==car.id){
        setShownCarImage(carImage)
      }
    });
  }, [carImages])

  function selectCarHandler() {
    dispatch(setCurrentCar(car));
    history.push(`/details/${car.id}`);
  }

  return (
    <div style={{ position: "relative", "width": "33%", "margin-bottom": "40px" }}>
      <img
        className="carImage"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
          marginTop: "15px",
          marginBottom: "15px",
        }}
        src={shownCarImage.imagePath?shownCarImage.imagePath:"https://nepalcarsrental.com/assets/images/NoCar.jpg"}
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
        <h3 style={{ padding: "5px", fontSize: 18 }}>${car.dailyPrice}/day</h3>
      </div>
    </div>
  );
}

export default CarItem;
