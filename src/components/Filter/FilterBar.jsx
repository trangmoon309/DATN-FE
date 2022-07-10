import React, { useState } from 'react'
import Select from 'react-select'
import { InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { TextField } from '@material-ui/core';

function FilterBar({datas, keyWord, setKeyWord, isSearchDate, onChangeSearchDate, searchDateValue}) {
  
  return (
    <div
      style={{
        display: "flex",
        "margin-bottom": "15px"
      }}>
      {(isSearchDate == true) ? 
      <div style={{width: "30%", "margin-right": "20px"}}>
        <TextField
          variant="outlined"
          label="Search Date"
          type="date"
          defaultValue="2017-05-24"
          value={searchDateValue}
          onChange={(event) => {onChangeSearchDate(event.target.value)}}
          style={{width: "100%"}}
        />
      </div>  : <></>}

      {
        datas != null ? (datas.map(item => 
          <div style={{width: "30%", "margin-right": "20px"}}>
            <Select options={item} styles={colourStyles} onChange={(selectedOption) => item[0].setSelected(selectedOption.value)}  />
          </div>
        )) : <div></div>
      }
      {
        setKeyWord != null ? (
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
        ) : <div></div>
      }
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
