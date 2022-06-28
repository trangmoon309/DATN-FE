import React, { useState,useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import NavigationBar from './../../components/NavigationBar/NavigationBar';
import FilterBar from './../../components/Filter/FilterBar';
import "../../table.css"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteUserTransaction,
  getUserTransactionList,
  setDeletedItem
} from "../../redux/transactionSlice/userTransactionSlice";
import * as FaIcons from 'react-icons/fa';
import './rating.css';
import Popup from "../../components/Popup";
import TransactionDetailForm from './TransactionDetailForm';
import TransactionDetailReviewForm from './TransactionDetailReviewForm';

let PageSize = 10;
const TransactionList = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userTransactions = useSelector(state => state.userTransaction.items);
  const totalUserTransaction = useSelector(state => state.userTransaction.totalUserTransaction);
  const [filterCostStatus, setFilterCostStatus] = useState(null);
  const [filterRentalStatus, setFilterRentalStatus] = useState(null);
  const [editedItem, setEditedItem] = useState(null);

  const [keyWord, setKeyWord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false)
  const [openReviewPopup, setOpenReviewPopup] = useState(false)

  let rentalStatusOptions = [
    {"setSelected":setFilterRentalStatus},
    {"value":0,"label": "Waiting for rentaling",},
    {"value":1,"label": "Using",},
    {"value":2,"label": "Returned"},
    {"value":3,"label": "Cancel paying"}
  ];
  let costStatusOptions = [
    {"setSelected":setFilterCostStatus},
    {"value":0,"label": "Deposited",},
    {"value":1,"label": "Waiting for paying",},
    {"value":2,"label": "Payed"}
  ];

  const options = [
    rentalStatusOptions,
    costStatusOptions
  ]

  useEffect(() => {
    dispatch(getUserTransactionList({skipCount:0,searchRequest:{
      userId:null,
      keyWord:null,
      costStatus:null,
      rentalStatus:null
    }}))
  },[])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return userTransactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getUserTransactionList({skipCount:0,searchRequest:{
      userId:null,
      keyWord:keyWord != null ? keyWord : null,
      costStatus:filterCostStatus != null ? filterCostStatus : null,
      rentalStatus:filterRentalStatus != null ? filterRentalStatus : null
    }}))
  },[keyWord, filterCostStatus, filterRentalStatus])
  
  const handleDelete = id => {
    dispatch(setDeletedItem(id));
    dispatch(deleteUserTransaction(id));
  }

  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(getUserTransactionList({keyWord:keyWord, skipCount:(page-1)*10}))
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
      <Popup
          title="Transaction Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <TransactionDetailForm
            content={editedItem} 
            setOpenPopup={setOpenPopup} />
      </Popup>
      <Popup 
        title="Transaction Review Form"
        openPopup={openReviewPopup}
        setOpenPopup={setOpenReviewPopup}
        >
          <TransactionDetailReviewForm
            content={editedItem} 
            setOpenPopup={setOpenReviewPopup} />
      </Popup>
      <table className="dataTable">
        <thead>
          <tr>
            <th>Index</th>
            <th>Code</th>
            <th>Customer</th>
            <th>Received Date</th>
            <th>Returned Date</th>
            <th>Total Cost</th>
            <th>Cost Status</th>
            <th>Rental Status</th>
            <th>Review Service Quality</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userTransactions.map((item, index) => {
            return (
              <tr>
                <td>{currentPage > 1 ? (index + 1)*(currentPage - 1)+ PageSize : index + 1}</td>
                <td>{item.code}</td>
                <td>{item.user.name + " " + item.user.surname}</td>
                <td>{item.receivedVehicleDate}</td>
                <td>{item.returnedVehicleDate}</td>
                <td>{item.totalCost}</td>
                <td>{
                  item.costStatus == 0 ? "Waiting for paying" : (item.costStatus == 1 ? "Payed" : (item.costStatus == 2 ? "Cancel paying" : ""))
                }</td>
                <td>{
                item.rentalStatus == 0 ? "Waiting for rentaling" : (item.costStatus == 1 ? "Using" : (item.costStatus == 2 ? "Returned" : ""))
                }</td>
                <td>
                  <span className={"rating_"+ item.reviewServiceQuality +"stars"}/>
                  {/* {item.reviewServiceQuality} */}
                </td>
                <td style={{"text-align":"center", "position":"relative"}}>
                    <button onClick={() => {setOpenPopup(true);setEditedItem(item)}}
                            style={{"align-self":"baseline", "width":"30px", "padding":"5px", "border-radius":"50px"}}>
                    <FaIcons.FaInfo />
                    </button>
                </td>
                <td style={{"text-align":"center", "position":"relative"}}>
                    <button onClick={() => {setOpenReviewPopup(true);setEditedItem(item)}}
                            style={{"align-self":"baseline", "width":"30px", "padding":"5px", "border-radius":"50px"}}>
                    <FaIcons.FaStar />
                    </button>
                </td>
                <td style={{"text-align":"center", "position":"relative"}}>
                    <button onClick={() => {handleDelete(item.id)}}
                            style={{"align-self":"baseline", 
                            "width":"30px", 
                            "padding":"5px", 
                            "border-radius":"50px",
                            "background-color":"#EC7575",
                            "border-color":"none"}}>
                    <FaIcons.FaTrashRestore />
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
          totalCount={totalUserTransaction}
          pageSize={PageSize}
          onPageChange={page => {onPageChange(page)}}
          />
      </div>
    </div>
  </div>
  );
};

export default TransactionList;