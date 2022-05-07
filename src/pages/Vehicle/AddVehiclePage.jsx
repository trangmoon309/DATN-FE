import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Dropdown, Icon } from "semantic-ui-react";
import axios from "axios";
import { addCar, deleteCar, getAllCars } from "../../redux/carSlice/carSlice";
import { getBrands } from "../../redux/filterSlice/filterSlice";
import { getAllColors } from "../../redux/colorSlice/colorSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import NavigationBar from '../../components/NavigationBar/NavigationBar';

function AddVehicle() {
    const dispatch = useDispatch()
    const history =useHistory()
  const [color, setColor] = useState(null);
  const [brand, setBrand] = useState(null);
  const [modelYear, setModelYear] = useState(0)
  const [description, setDescription] = useState('')
  const [dailyPrice, setDailyPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [next, setNext] = useState(false)
  const [lastAddedCar, setLastAddedCar] = useState(null)
  
  const [id, setId] = useState(0)
  
 const colors = useSelector((state) => state.color.items);
 const brands = useSelector((state) => state.filter.brands);
 const cars = useSelector(state => state.cars.items)

 useEffect(() => {
     dispatch(getBrands())
     dispatch(getAllColors())
     
 }, [dispatch])


 useEffect(() => {
        setLastAddedCar({...lastAddedCar, brand:brand, color:color, dailyPrice:dailyPrice, description:description, modelYear:modelYear})
 }, [brand, color, dailyPrice, description, modelYear])

 function nextHandler(){
    if(!color||!modelYear||!dailyPrice||!brand||!description){
      alert("Fill the fields")
    }
    else{
      dispatch(addCar(lastAddedCar)).then(response=>{
        dispatch(getAllCars())
      }).catch(err=>console.log(err))
      
        
      setNext(true)
      
    }
 }
 function addCarHandler(){
    if (!file){
      return alert("Choose image")
    }
    else{
      setTimeout(() => {
        fileUpload(file)
      }, 1000);
    }
 }

  function handleImagePreview(e){
      setFile(e.target.files[0])
  }

     function fileUpload(file){
    const url = `https://springrestapi-carrental.herokuapp.com/api/images/add?id=${cars[cars.length-1].id}`
    const formData = new FormData()
    formData.append('imageFile',file)
    const config = {
        headers:{
            'content-type':'multipart/form-data'
        }
    }
    
      axios.post(url, formData, config).then(response=>{
        console.log(response)
        toast.success("Car added successfully")
        history.push('/')
      }).catch(err=>{
        dispatch(deleteCar(cars[cars.length-1].id))
        setTimeout(() => {
          toast.success("An error occured. Try again later")
        history.push('/')
        console.log(err)
        }, 1000);
      })
    }


  return (
<div>
    <div style={{"z-index": "2em" }}>
        <NavigationBar></NavigationBar>
      </div>
      <div className="app">

      </div>
    </div>
  );
}

export default AddVehicle;
