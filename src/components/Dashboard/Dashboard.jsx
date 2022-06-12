import FeaturedInfo from "./FeaturedInfo";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./home.css";
import WidgetLg from './WidgetLg';
import WidgetSm from './WidgetSm';
import LineChart from "./LineChart";
import { FooterContainer } from './../Footer/FooterContainer';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  getUserList,
  setLoggedInTrue,
  setAdminTrue,
  setAdminFalse,
  setCurrentUser
} from "../../redux/userSlice/userSlice";
import {
  getUserTransactionList,
  getSummary,
} from "../../redux/transactionSlice/userTransactionSlice";
import { useHistory } from "react-router";

export default function Dashboard() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.allUsers);
  const userTransactions = useSelector(state => state.userTransaction.items);
  const summary = useSelector(state => state.userTransaction.summary);
  const admin = useSelector(state => state.user.admin);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const history = useHistory()

  useEffect(() => {
    if(localStorage.getItem("user") != null && loggedIn == false){
      dispatch(setLoggedInTrue());
      const currentUser = JSON.parse(localStorage.getItem("user"));
      dispatch(setCurrentUser({
        user: currentUser,
      }));
      if(currentUser.userRoles.length > 0 && currentUser.userRoles[0].role.name == "admin"){
        dispatch(setAdminTrue());
      }
      else{
        dispatch(setAdminFalse());
        history.push('/vehicle');  
      }
    };
    if(admin == true){
      dispatch(getUserList());
      dispatch(getUserTransactionList({skipCount:0,searchRequest:{
        userId:null,
        keyWord:null,
        costStatus:null,
        rentalStatus:null
      }}));
      dispatch(getSummary());
    }
  },[])

  return (
    <div>
        <div style={{"zIndex": "2em" }}>
            <NavigationBar></NavigationBar>
        </div>
        <div className="home">
            <FeaturedInfo data={summary} />
            <div  className="linechart">
              <LineChart
                datas={summary}
              ></LineChart>
            </div>
            <div className="homeWidgets">
                <WidgetSm
                  datas={users}
                />
                <WidgetLg
                  datas={userTransactions}
                />
            </div>
        </div>
        <FooterContainer></FooterContainer>
    </div>
  );
}
