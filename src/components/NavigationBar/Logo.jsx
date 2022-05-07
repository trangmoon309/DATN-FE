import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setInputText } from "../../redux/searchBarSlice/searchBarSlice";

function Logo() {
  const history = useHistory();
  const dispatch = useDispatch();
  function clickHandler() {
    dispatch(setInputText(""));
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
