import React, { useState,useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import FilterBar from '../../components/Filter/FilterBar';
import "../../table.css"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  getUserTransactionVehicleList,
} from "../../redux/transactionSlice/userTransactionSlice";
import './rating.css';
let PageSize = 10;
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
const TransactionVehicleListPage = props => {
  const dispatch = useDispatch();
  const userTransactions = useSelector(state => state.userTransaction.itemVehicles);
  const totalUserTransaction = useSelector(state => state.userTransaction.totalUserTransactionVehicle);
  const [filterCostStatus, setFilterCostStatus] = useState(null);
  const [filterRentalStatus, setFilterRentalStatus] = useState(null);
  const [searchReceiveDate, setReceiveSearchDate] = useState(formatDate(new Date(Date.now())));
  const [keyWord, setKeyWord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = useSelector(state => state.user.admin);

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
    dispatch(getUserTransactionVehicleList({skipCount:0,searchRequest:{
      userId:isAdmin ? null : currentUser.id,
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
    dispatch(getUserTransactionVehicleList({skipCount:0,searchRequest:{
      userId:isAdmin ? null : currentUser.id,
      keyWord:keyWord != null ? keyWord : null,
      costStatus:filterCostStatus != null ? filterCostStatus : null,
      rentalStatus:filterRentalStatus != null ? filterRentalStatus : null,
      searchDate:searchReceiveDate != null ? searchReceiveDate : null, 
    }}))
  },[keyWord, filterCostStatus, filterRentalStatus, searchReceiveDate])
  

  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(getUserTransactionVehicleList({keyWord:keyWord, skipCount:(page-1)*10}))
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
        isSearchDate={true}
        onChangeSearchDate={setReceiveSearchDate}
        searchDateValue={searchReceiveDate}
      ></FilterBar>
      
      <table className="dataTable">
        <thead>
          <tr>
            <th>Index</th>
            <th>Code</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Received Date</th>
            <th>Returned Date</th>
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
                <td>{item.vehicle.name + " " + item.vehicle.modelYear}</td>
                <td>{item.transaction.receivedVehicleDate}</td>
                <td>{item.transaction.returnedVehicleDate}</td>
                <td>{item.transaction.totalCost}</td>
                <td>{
                  item.transaction.costStatus == 0 ? "Waiting for paying" : (item.transaction.costStatus == 1 ? "Payed" : (item.transaction.costStatus == 2 ? "Cancel paying" : ""))
                }</td>
                <td>{
                item.transaction.rentalStatus == 0 ? "Waiting for rentaling" : (item.transaction.costStatus == 1 ? "Using" : (item.transaction.costStatus == 2 ? "Returned" : ""))
                }</td>
                <td></td>
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

export default TransactionVehicleListPage;