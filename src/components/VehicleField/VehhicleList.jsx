import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';
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
  getVehicleLineList2
} from "../../redux/vehicleSlice/vehicleLineSlice";
import {
  getVehicleTypeList2
} from "../../redux/vehicleSlice/vehicleTypeSlice";
import Pagination from '../../pages/Pagination/Pagination';

let PageSize = 10;
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function VehicleList() {
  const history = useHistory();
  const dispatch = useDispatch();
  let query = useQuery();
  let name = query.get("name");
  let vehicleTypeId = query.get("vehicleTypeId");
  let vehicleLineId = query.get("vehicleLineId");

  const [openPopup, setOpenPopup] = useState(false)
  const [keyWord, setKeyWord] = useState(name != null ? name : null);
  const [editedItem, setEditedItem] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const vehicles = useSelector(state => state.vehicle.items);
  const vehicleLines = useSelector(state => state.vehicleLine.allItems);
  const vehicleTypes = useSelector(state => state.vehicleType.allItems);
  const [currentPage, setCurrentPage] = useState(1);
  const totalVehicles = useSelector(state => state.vehicle.totalVehicle);
  const [filterVehicleLine, setFilterVehicleLine] = useState(vehicleLineId != null ? vehicleLineId : null);
  const [filterVehicleType, setFilterVehicleType] = useState(vehicleTypeId != null ? vehicleTypeId : null);
  const isAdmin = useSelector(state => state.user.admin);

  // Options for selection
  let vehicleLineOptions = [{"setSelected":setFilterVehicleLine}];
  vehicleLineOptions.push({
    "value":null,
    "label":"All",
  });
  vehicleLines.forEach(item => {
    vehicleLineOptions.push({
      "value":item.id,
      "label":item.name,
    })
  })

  let vehicleTypeOptions = [{"setSelected":setFilterVehicleType}];
  vehicleTypeOptions.push({
    "value":null,
    "label":"All",
  });
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
      dispatch(getVehicleLineList2({keyWord:keyWord, skipCount:0}))
    }
    if(vehicleTypes.length == 0){
      dispatch(getVehicleTypeList2({keyWord:keyWord, skipCount:0}))
    }
  },[])

  useEffect(() => {
    var pathName = '/vehicle';
    var searches = '';

    if(keyWord != null && keyWord.length>0){
      if(searches.includes('?')) searches += '&name='+keyWord;
      else searches += '?name='+keyWord;
    }

    if(filterVehicleLine != null){
      if(searches.includes('?')) searches += '&vehicleLineId='+filterVehicleLine;
      else searches += '?vehicleLineId='+filterVehicleLine;
    }

    if(filterVehicleType != null){
      if(searches.includes('?')) searches += '&vehicleTypeId='+filterVehicleType;
      else searches += '?vehicleTypeId='+filterVehicleType;
    }

    history.push({
      pathname: pathName,
      search: searches,
    })

    dispatch(getVehicleList({
      keyWord:keyWord != null ? keyWord : null, 
      skipCount:0,
      vehicleLineId: filterVehicleLine != null ? filterVehicleLine : null,
      vehicleTypeId: filterVehicleType != null ? filterVehicleType : null
    }));
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
        {(isAdmin == true) ? <Controls.Button
            text="Add New"
            variant="outlined"
            className={classes.newButton}
            startIcon={<AddIcon />}
            onClick={() => { setOpenPopup(true); setEditedItem(null); setIsEdited(false)}}/> : <></>}
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
