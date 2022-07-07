import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';
import { Grid } from "semantic-ui-react";
import FilterBar from "../../components/Filter/FilterBar";
import NavigationBar from "./../../components/NavigationBar/NavigationBar";
import { makeStyles} from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import {
  getRecommendVehicleList
} from "../../redux/vehicleSlice/vehicleSlice";
import {
  getVehicleLineList2
} from "../../redux/vehicleSlice/vehicleLineSlice";
import {
  getVehicleTypeList2
} from "../../redux/vehicleSlice/vehicleTypeSlice";
import Pagination from '../Pagination/Pagination';
import Popup from './../../components/Popup';
import { FooterContainer } from './../../components/Footer/FooterContainer';
import VehicleForm from './../../components/VehicleField/VehicleForm';
import VehicleItem from './../../components/VehicleField/VehicleItem';

let PageSize = 10;
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function RecommendList() {
  const history = useHistory();
  const dispatch = useDispatch();
  let query = useQuery();
  let name = query.get("name");
  let vehicleTypeId = query.get("vehicleTypeId");
  let vehicleLineId = query.get("vehicleLineId");

  const [keyWord, setKeyWord] = useState(name != null ? name : null);
  const vehicles = useSelector(state => state.vehicle.recommendItems);
  const vehicleLines = useSelector(state => state.vehicleLine.allItems);
  const vehicleTypes = useSelector(state => state.vehicleType.allItems);
  const [currentPage, setCurrentPage] = useState(1);
  const totalVehicles = useSelector(state => state.vehicle.totalRecommendVehicle);
  const [filterVehicleLine, setFilterVehicleLine] = useState(vehicleLineId != null ? vehicleLineId : null);
  const [filterVehicleType, setFilterVehicleType] = useState(vehicleTypeId != null ? vehicleTypeId : null);
  const currentUser = useSelector(state => state.user.currentUser);

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

  useEffect(() => {
    dispatch(getRecommendVehicleList({userId: currentUser.id, keyWord:keyWord, skipCount:0}));
    if(vehicleLines.length == 0){
      dispatch(getVehicleLineList2({keyWord:keyWord, skipCount:0}))
    }
    if(vehicleTypes.length == 0){
      dispatch(getVehicleTypeList2({keyWord:keyWord, skipCount:0}))
    }
  },[])

  useEffect(() => {
    var pathName = '/recommendation';
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

    dispatch(getRecommendVehicleList({
      userId: currentUser.id,
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
    dispatch(getRecommendVehicleList({userId: currentUser.id, keyWord:keyWord, skipCount:(page-1)*10}));
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

export default RecommendList;
