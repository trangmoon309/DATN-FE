import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import NavigationBar from './../../components/NavigationBar/NavigationBar';
import FilterBar from './../../components/Filter/FilterBar';
import "../../table.css"
import * as FaIcons from 'react-icons/fa';
import Popup from './../../components/Popup';
import AddVehicleTypeForm from './AddVehicleTypeForm';
import AddIcon from '@material-ui/icons/Add';
import Controls from './../../components/controls/Controls';
import { makeStyles} from '@material-ui/core';
import {
  deleteVehicleType,
  getVehicleTypeList,
  setDeletedItem
} from "../../redux/vehicleSlice/vehicleTypeSlice";

let PageSize = 10;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const VehicleTypeList = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  let query = useQuery();
  let name = query.get("name");
  const vehicleTypes = useSelector(state => state.vehicleType.items);
  const totalVehicleTypes = useSelector(state => state.vehicleType.totalVehicleTypes);

  const [keyWord, setKeyWord] = useState(name != null ? name : null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const isAdmin = useSelector(state => state.user.admin);

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
    // [{ value: 'chocolate', label: 'Chocolate' },
    // { value: 'strawberry', label: 'Strawberry' },
    // { value: 'vanilla', label: 'Vanilla' }],
  ]

  useEffect(() => {
    dispatch(getVehicleTypeList({keyWord:keyWord, skipCount:0}))
  },[])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return vehicleTypes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const handleDelete = id => {
    dispatch(setDeletedItem(id));
    dispatch(deleteVehicleType(id));
  }

  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(getVehicleTypeList({keyWord:keyWord, skipCount:(page-1)*10}))
  }

  useEffect(() => {
    if(keyWord != null && keyWord.length>0){
      history.push({
        pathname: '/vehicle-type',
        search: '?name='+keyWord,
      })
    }else{
      history.push({
        pathname: '/vehicle-type',
      })
    }

    dispatch(getVehicleTypeList({keyWord:keyWord, skipCount:0}))
  },[keyWord])

  return (
    <div>
    <div style={{"z-index": "2em" }}>
      <NavigationBar></NavigationBar>
    </div>
    <div className="app" >
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
        title="Vehicle Type Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
      <AddVehicleTypeForm
        recordForEdit={isEdited}
        content={editedItem} 
        setOpenPopup={setOpenPopup}
      />
      </Popup>
      <table className="dataTable">
        <thead>
          <tr>
            <th>Index</th>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Creation Time</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vehicleTypes.map((item, index) => {
            return (
              <tr>
                  <td>{currentPage > 1 ? (index + 1)*(currentPage - 1)+ PageSize : index + 1}</td>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.creationTime}</td>

                {(isAdmin == true) ? <td style={{"text-align":"center", "position":"relative"}}>
                <button onClick={() => { setOpenPopup(true); setEditedItem(item); setIsEdited(true)}}
                          style={{"align-self":"baseline", "width":"30px", "padding":"5px", "border-radius":"50px"}}>
                  <FaIcons.FaEdit />
                  </button>
                </td> : <td></td>}
                  {(isAdmin == true) ? <td style={{"text-align":"center"}}>
                <button onClick={() => {handleDelete(item.id)}}
                          style={{"align-self":"baseline", "width":"30px", "padding":"5px", "border-radius":"50px"}}>
                  <FaIcons.FaTrash />
                  </button>
                </td> : <td></td>}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{"margin-left":"70%"}}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalVehicleTypes}
          pageSize={PageSize}
          onPageChange={page => onPageChange(page)}
        />
      </div>
    </div>
  </div>
  );
};

export default VehicleTypeList;