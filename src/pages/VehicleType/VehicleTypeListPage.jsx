import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination/Pagination';
import data from './mock-data.json';
import NavigationBar from './../../components/NavigationBar/NavigationBar';
import FilterBar from './../../components/Filter/FilterBar';
import "../../table.css"
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import Popup from './../../components/Popup';
import AddVehicleTypeForm from './AddVehicleTypeForm';
import AddIcon from '@material-ui/icons/Add';
import Controls from './../../components/controls/Controls';
import { makeStyles} from '@material-ui/core';

let PageSize = 10;

const VehicleTypeList = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

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

  return (
    <div>
    <div style={{"z-index": "2em" }}>
      <NavigationBar></NavigationBar>
    </div>
    <div className="app" >
      <FilterBar
        datas={options}
      ></FilterBar>
      <div className="wrapper" style={{"height": "50px", "position": "relative" }}>
        <Controls.Button
          text="Add New"
          variant="outlined"
          className={classes.newButton}
          startIcon={<AddIcon />}
          onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}/>
      </div>
      <Popup
        title="Vehicle Type Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
      <AddVehicleTypeForm
        recordForEdit={recordForEdit}
        addOrEdit={null} 
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
          {currentTableData.map(item => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td style={{"text-align":"center", "position":"relative"}}>
                  <button onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                          style={{"align-self":"baseline", "width":"30px", "padding":"5px", "border-radius":"50px"}}>
                  <FaIcons.FaEdit />
                  </button>
                </td>
                <td style={{"text-align":"center"}}>
                  <button onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
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
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  </div>
  );
};

export default VehicleTypeList;