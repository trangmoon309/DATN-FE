import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { InputGroup, FormControl } from 'react-bootstrap';

function FilterBar({datas, keyWord, setKeyWord}) {
  return (
    <div
      style={{
        display: "flex",
        "margin-bottom": "15px"
      }}>

      {
        datas.map(item => 
          <div style={{width: "30%", "margin-right": "20px"}}>
          {/* Dòng xe */}
            <Select options={item} styles={colourStyles}  />
          </div>
        )
      }

      <div style={{width: "30%", "margin-right": "20px"}}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Searching..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
          />
        </InputGroup>
      </div> 
    </div>
  );
}

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      color: "black",
    };
  }
};

export default FilterBar;
