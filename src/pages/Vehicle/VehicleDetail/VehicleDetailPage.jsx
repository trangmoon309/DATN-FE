import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router";
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import "../../../table.css";
import "./vehicleDetail.css";
import { Colors } from './Colors';
import {
  clearImagesByCarId,
  deleteCar,
  getImagesByCarId,
} from "../../../redux/carSlice/carSlice";
import axios from "axios";
import { toast } from "react-toastify";
import AliceCarousel from "react-alice-carousel";

let index = 0;

const VehicleDetail = props => {

  const currentCar = useSelector((state) => state.cars.currentCar);
  const imagesByCarId = useSelector((state) => state.cars.imagesByCarId);
  const [file, setFile] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentCustomer = useSelector(
    (state) => state.customer.currentCustomer
  );

  console.log(imagesByCarId);
  
  useEffect(() => {
    dispatch(getImagesByCarId(currentCar.id));
  }, [dispatch, currentCar]);

  useEffect(() => () => dispatch(clearImagesByCarId()), []);

  function handleImagePreview(e) {
    setFile(e.target.files[0]);
  }

  async function addImageHandler() {
    if (file) {
      await fileUpload(file)
        .then((response) => {
          toast.success("image added successfully");
          console.log(response);
        })
        .catch((er) => console.log(er));
    } else {
      alert("choose image");
    }
  }

  function deleteCarHandler() {
    dispatch(deleteCar(currentCar));
    setTimeout(() => {
      history.push("/");
    }, 300);
  }

  async function fileUpload(file) {
    const url = `https://springrestapi-carrental.herokuapp.com/api/images/add?id=${currentCar.id}`;
    const formData = new FormData();
    formData.append("imageFile", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const response = await axios.post(url, formData, config);
    return response;
  }

    var products = [
        {
          "_id": "1",
          "title": "Nike Shoes",
          "src": [
              "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
              "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
              "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
              "https://www.upsieutoc.com/images/2020/06/27/img4.jpg"
            ],
          "description": "UI/UX designing, html css tutorials",
          "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
          "price": 23,
          "colors":["red","black","crimson","teal"],
          "count": 1
        }
    ];

    var myRef = React.createRef();

    function handleTab(index2) {
        index = index2;
        const images = myRef.current.children;
        for(let i=0; i<images.length; i++){
          images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
      };
    
    function componentDidMount() {
        myRef.current.children[index].className = "active";
    }

  return (
    <div>
      <div style={{"z-index": "2em" }}>
        <NavigationBar></NavigationBar>
      </div>
      <div className="app" style={{"box-shadow": "0 0 5px #ccc"}}>
          <div className="details" key={currentCar.id}>
            <div className="big-img" style={{"width": "100%"}}>
              {imagesByCarId.length > 0 ? (
                <AliceCarousel autoPlay autoPlayInterval="3000">
                {imagesByCarId.map((image) => (
                  <img
                    key={image.id}
                    src={image.imagePath}
                    className="sliderimg"
                  />
                ))}
                </AliceCarousel>
              ) : (
                <img src="https://nepalcarsrental.com/assets/images/NoCar.jpg" alt=""/>
              )}
            </div>

            <div className="box">
              <div className="row">
                <h2>{currentCar.modelYear}</h2>
                <span>${currentCar.dailyPrice}</span>
              </div>
              <Colors colors={products[0].colors} />

              <p>{currentCar.description}</p>
              <p>{products[0].colors}</p>
              <button className="cart">Add to cart</button>
            </div>
          </div>
      </div>
  </div>
  );
};

export default VehicleDetail;