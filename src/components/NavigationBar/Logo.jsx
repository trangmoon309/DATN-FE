import React from "react";
import { useHistory } from "react-router-dom";

function Logo() {
  const history = useHistory();
  function clickHandler() {
    history.push('/')
  }
  return (
    <img
      alt="logo"
        onClick={clickHandler}
        className="logoImage"
        style={{width: "70%", "margin": "10px"}}
        src={"https://www.happy.rentals/images/logo.png"}
    ></img>
  );
}

export default Logo;
