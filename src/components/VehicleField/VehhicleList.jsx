import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import VehicleItem from "./VehicleItem";
import FilterBar from "../Filter/FilterBar";
import NavigationBar from '../NavigationBar/NavigationBar';
import Popup from "../Popup";
import VehicleForm from "./VehicleForm";
import { makeStyles} from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import { FooterContainer } from './../Footer/FooterContainer';
import {
  getVehicleList
} from "../../redux/vehicleSlice/vehicleSlice";
import {
  getVehicleLineList,
} from "../../redux/vehicleSlice/vehicleLineSlice";
import {
  getVehicleTypeList,
} from "../../redux/vehicleSlice/vehicleTypeSlice";
import Pagination from '../../pages/Pagination/Pagination';

let PageSize = 10;
function VehicleList() {
  const dispatch = useDispatch()
  const [openPopup, setOpenPopup] = useState(false)
  const [keyWord, setKeyWord] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const vehicles = useSelector(state => state.vehicle.items);
  const vehicleLines = useSelector(state => state.vehicleLine.items);
  const vehicleTypes = useSelector(state => state.vehicleType.items);
  const [currentPage, setCurrentPage] = useState(1);
  const totalVehicles = useSelector(state => state.vehicle.totalVehicle);
  const [filterVehicleLine, setFilterVehicleLine] = useState(null);
  const [filterVehicleType, setFilterVehicleType] = useState(null);

  let vehicleLineOptions = [{"setSelected":setFilterVehicleLine}];
  vehicleLines.forEach(item => {
    vehicleLineOptions.push({
      "value":item.id,
      "label":item.name,
    })
  })

  let vehicleTypeOptions = [{"setSelected":setFilterVehicleType}];
  vehicleTypes.forEach(item => {
    vehicleTypeOptions.push({
      "value":item.id,
      "label":item.name,
    })
  })

  const options = [
    vehicleLineOptions,
    vehicleTypeOptions,
  ]

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

  useEffect(() => {
    dispatch(getVehicleList({keyWord:keyWord, skipCount:0}));
    if(vehicleLines.length == 0){
      dispatch(getVehicleLineList({keyWord:keyWord, skipCount:0}))
    }
    if(vehicleTypes.length == 0){
      dispatch(getVehicleTypeList({keyWord:keyWord, skipCount:0}))
    }
  },[])

  useEffect(() => {
    dispatch(getVehicleList({
      keyWord:keyWord != null ? keyWord : null, 
      skipCount:0,
      vehicleLineId: filterVehicleLine != null ? filterVehicleLine : null,
      vehicleTypeId: filterVehicleType != null ? filterVehicleType : null
    }))
  },[keyWord, filterVehicleLine, filterVehicleType])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return vehicleLines.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(getVehicleList({keyWord:keyWord, skipCount:(page-1)*10}))
  }

  return (
    <div>
      <div style={{"z-index": "2em" }}>
        <NavigationBar></NavigationBar>
      </div>
      <div className="app">
        <FilterBar
          datas={options}
          keyWord={keyWord}
          setKeyWord={setKeyWord}
        ></FilterBar>
        <div className="wrapper" style={{"height": "50px", "position": "relative" }}>
        <Controls.Button
          text="Add New"
          variant="outlined"
          className={classes.newButton}
          startIcon={<AddIcon />}
          onClick={() => { setOpenPopup(true); setEditedItem(null); setIsEdited(false)}}/>
        </div>
        <Popup
          title="Vehicle Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <VehicleForm
          recordForEdit={isEdited}
          content={editedItem} 
          setOpenPopup={setOpenPopup}
          />
        </Popup>
        <Grid columns="3">
          {vehicles.map((vehicle) => (
              <VehicleItem key={vehicle.id} vehicle={vehicle} vehicleImages={vehicle.vehicleImages}></VehicleItem>
          ))}
        </Grid>
      </div>
      <div style={{"margin-left":"70%"}}>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalVehicles}
            pageSize={PageSize}
            onPageChange={page => {onPageChange(page)}}
          />
        </div>
      <FooterContainer></FooterContainer>
    </div>
  );
}

export default VehicleList;
