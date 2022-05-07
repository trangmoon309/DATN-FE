import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import EmployeeForm from './EmployeeForm';

function ProfilePage() {
    const currentCustomer = useSelector(state => state.customer.currentCustomer)
  return (
    <div>
      <div style={{"z-index": "2em" }}>
      <NavigationBar></NavigationBar>
      </div>
      <div className="app">
        <EmployeeForm></EmployeeForm>
      </div>
      <FooterContainer></FooterContainer>
    </div>
  );
}

export default ProfilePage;
