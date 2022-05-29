import React, { useState,useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import NavigationBar from './../../components/NavigationBar/NavigationBar';
import FilterBar from './../../components/Filter/FilterBar';
import "../../table.css"
import * as FaIcons from 'react-icons/fa';
import Popup from './../../components/Popup';
import AddVehicleLineForm from './AddVehicleLineForm';
import AddIcon from '@material-ui/icons/Add';
import Controls from './../../components/controls/Controls';
import { makeStyles} from '@material-ui/core';
import {
  deleteVehicleLine,
  getList,
  setDeletedItem
} from "../../redux/vehicleSlice/vehicleLineSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";


let PageSize = 10;
const VehicleLineList = props => {
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
  const history = useHistory();
  const dispatch = useDispatch();
  const vehicleLines = useSelector(state => state.vehicleLine.items);
  const totalVehicleLines = useSelector(state => state.vehicleLine.totalVehicleLine);

  const [keyWord, setKeyWord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const classes = useStyles();
  const options = []

  useEffect(() => {
    dispatch(getList({keyWord:keyWord, skipCount:0}))
  },[])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return vehicleLines.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getList({keyWord:keyWord, skipCount:0}))
  },[keyWord])

  
  const handleDelete = id => {
    dispatch(setDeletedItem(id));
    dispatch(deleteVehicleLine(id));
  }

  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(getList({keyWord:keyWord, skipCount:(page-1)*10}))
  }

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
          title="Vehicle Line Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddVehicleLineForm
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
              <th>Creation Time</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicleLines.map(item => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.creationTime}</td>
                  <td style={{"text-align":"center", "position":"relative"}}>
                    <button onClick={() => { setOpenPopup(true); setEditedItem(item); setIsEdited(true)}}
                            style={{"align-self":"baseline", "width":"30px", "padding":"5px", "border-radius":"50px"}}>
                    <FaIcons.FaEdit />
                    </button>
                  </td>
                  <td style={{"text-align":"center"}}>
                    <button onClick={() => {handleDelete(item.id)}}
                            style={{"align-self":"baseline", "width":"30px", "padding":"5px", "border-radius":"50px"}}>
                    <FaIcons.FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{"margin-left":"70%"}}>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalVehicleLines}
            pageSize={PageSize}
            onPageChange={page => {onPageChange(page)}}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleLineList;