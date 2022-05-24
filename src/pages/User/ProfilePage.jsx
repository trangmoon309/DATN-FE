import React from "react";
import { useParams } from "react-router";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import EmployeeForm from './EmployeeForm';

function ProfilePage() {
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
