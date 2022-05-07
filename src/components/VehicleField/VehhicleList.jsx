import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { getAllCars, getCarsImages} from "../../redux/carSlice/carSlice";
import CarItem from "./VehicleItem";
import FilterBar from "../Filter/FilterBar";
import NavigationBar from '../NavigationBar/NavigationBar';
import Popup from "../Popup";
import VehicleForm from "./VehicleForm";
import { makeStyles} from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import { FooterContainer } from './../Footer/FooterContainer';

function VehicleList() {
  const dispatch = useDispatch()
  const searchedText = useSelector((state) => state.search.inputText);
  const cars = useSelector(state => state.cars.items)
  const carImages = useSelector((state) => state.cars.images);
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)

  const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
  }))

  const classes = useStyles();

  const options = [
    [{ value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }],

    [{ value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }],
    
    [{ value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }]
  ]

  let searchedCars = [];

  if (searchedText) {
    cars.forEach((car) => {
      if (car.brand.name.toLowerCase().includes(searchedText)) {
        searchedCars.push(car);
      }
    });
  }

  useEffect(() => {
    dispatch(getAllCars())
    dispatch(getCarsImages());
  }, [dispatch])

  return (
    <div>
      <div style={{"z-index": "2em" }}>
        <NavigationBar></NavigationBar>
      </div>
      <div className="app">
        <FilterBar
        datas={options}>
        </FilterBar>
        <div className="wrapper" style={{"height": "50px", "position": "relative" }}>
          <Controls.Button
            text="Add New"
            variant="outlined"
            className={classes.newButton}
            startIcon={<AddIcon />}
            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}/>
        </div>
        <Popup
          title="Vehicle Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <VehicleForm
          recordForEdit={recordForEdit}
          addOrEdit={null} />
        </Popup>
        <Grid columns="3">
          {searchedText &&
            searchedCars.map((car) => (
              !car.busy&&<CarItem key={car.id} car={car} carImages={carImages}></CarItem>
              ))}
          {!searchedText &&
            cars.map((car) => (
              !car.busy&&<CarItem key={car.id} car={car} carImages={carImages}></CarItem>
          ))}
        </Grid>
      </div>
      <FooterContainer></FooterContainer>
    </div>
  );
}

export default VehicleList;
