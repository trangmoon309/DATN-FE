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
import './vehicleListStyle.css'
import { toast } from 'react-toastify';

let PageSize = 10;
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
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
  const [filterModelYear, setFilterModelYear] = useState(null);

  const isAdmin = useSelector(state => state.user.admin);
  const [searchDate, setSearchDate] = useState(formatDate(new Date(Date.now())));
  const [ price, setPrice ] = useState(0);

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

  let modelYearOptions = [{"setSelected":setFilterModelYear}];
  modelYearOptions.push(
  {
    "value":null,
    "label":"All",
  },
  {
    "value":2019,
    "label":"2019",
  },
  {
    "value":2020,
    "label":"2020",
  },
  {
    "value":2021,
    "label":"2021",
  },
  {
    "value":2022,
    "label":"2022",
  },
  );

  const options = [
    vehicleLineOptions,
    vehicleTypeOptions,
    modelYearOptions
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
      searchDate:searchDate != null ? searchDate : null, 
      skipCount:0,
      vehicleLineId: filterVehicleLine != null ? filterVehicleLine : null,
      vehicleTypeId: filterVehicleType != null ? filterVehicleType : null,
      price: price == 0 ? null : price,
      modelYear: filterModelYear != null ? filterModelYear : null,
    }));

    localStorage.setItem("searchVehicleDate", searchDate);

    },[keyWord, filterVehicleLine, filterVehicleType, searchDate, price,filterModelYear])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return vehicleLines.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(getVehicleList({keyWord:keyWord, skipCount:(page-1)*10}))
  }


  // Triggered when the value gets updated while scrolling the slider:
  const handleInput = (e)=>{
    setPrice( e.target.value );
  }
  return (
    <div>
      <div style={{"z-index": "2em" }}>
        <NavigationBar></NavigationBar>
      </div>
      <div className="header-decorator">
        <section class="section hero" id="home">
          <div class="containerd">

            <div class="hero-content">
              <h2 class="h1 hero-title">THE EASY WAY TO TAKEOVER A VEHICLE</h2>

              <p class="hero-text">
                Based on Viet Nam!
              </p>
            </div>
            <div class="hero-banner"></div>
          </div>
        </section>
      </div>
      <div className="app2">
        <FilterBar
          datas={options}
          keyWord={keyWord}
          setKeyWord={setKeyWord}
          isSearchDate={true}
          onChangeSearchDate={setSearchDate}
          searchDateValue={searchDate}
        ></FilterBar>

        <input type="range" min="0" max="1000" onInput={ handleInput } /> <h5> Less than Price: ${ price }</h5>
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

      {/* 4 simple steps */}
      <section class="section get-start">
        <div class="containerd">
          <h2 class="h2 section-title">Get started with 4 simple steps</h2>

          <ul class="get-start-list">

            <li>
              <div class="get-start-card">

                <div class="card-icon icon-1">
                  <ion-icon name="person-add-outline"></ion-icon>
                </div>

                <h3 class="card-title">Create a profile</h3>

                <p class="card-text">
                  If you are going to use a passage of Happy Rental, you need to signup and update your profile.
                </p>

              </div>
            </li>

            <li>
              <div class="get-start-card">

                <div class="card-icon icon-2">
                  <ion-icon name="car-outline"></ion-icon>
                </div>

                <h3 class="card-title">Find what car you want</h3>

                <p class="card-text">
                  You can search for the car you are looking for renting. Based on criterias: type, line and the date you want to rent.
                </p>

              </div>
            </li>

            <li>
              <div class="get-start-card">

                <div class="card-icon icon-3">
                  <ion-icon name="person-outline"></ion-icon>
                </div>

                <h3 class="card-title">Add to card</h3>

                <p class="card-text">
                  After finding out your suitable vehicles. Add them to your cart. Then you can adjust the amount you want to rent or remove them.
                </p>

              </div>
            </li>

            <li>
              <div class="get-start-card">

                <div class="card-icon icon-4">
                  <ion-icon name="card-outline"></ion-icon>
                </div>

                <h3 class="card-title">Make a payment</h3>

                <p class="card-text">
                  You will be redirected to Paypal when check-out cart, you need to sign in your Paypal account and pay for the total cost.
                </p>

              </div>
            </li>

          </ul>

        </div>
      </section>
      <FooterContainer></FooterContainer>
    </div>
  );
}

export default VehicleList;
