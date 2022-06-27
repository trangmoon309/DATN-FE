import FeaturedInfo from "./FeaturedInfo";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./home.css";
import WidgetLg from './WidgetLg';
import WidgetSm from './WidgetSm';
import LineChart from "./LineChart";
import { FooterContainer } from './../Footer/FooterContainer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  getUserList,
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
  const history = useHistory()

  const isAdmin = useSelector(state => state.user.admin);
  const currentUser = useSelector(state => state.user.currentUser);
  const currentUserStorage = localStorage.getItem("user");

  useEffect(() => {
    if(currentUser == null &&  currentUserStorage!= null){
      dispatch(setCurrentUser({
        user: JSON.parse(currentUserStorage),
      })).then((res) => {
        if(isAdmin == true){
          dispatch(getUserList());
          dispatch(getUserTransactionList({skipCount:0,searchRequest:{
            userId:null,
            keyWord:null,
            costStatus:null,
            rentalStatus:null
          }}));
          dispatch(getSummary());
        }
        else{
          history.push('/vehicle');  
        }
      });
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
