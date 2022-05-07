import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { getAllColors } from "../../redux/colorSlice/colorSlice";
import { useHistory } from "react-router-dom";
import { setFilterButtonPressed } from "../../redux/filterSlice/filterSlice";
import { toast } from "react-toastify";

function FilterBar({datas}) {
  const colors = useSelector((state) => state.color.items);
  const dispatch = useDispatch();
  const history = useHistory()
  const maxPrice = useSelector((state) => state.filter.maxPrice);
  const minPrice = useSelector((state) => state.filter.minPrice);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]  

  function clickFilterHandler() {
    if(maxPrice>0 || minPrice>0|| colors.length>0){
      dispatch(setFilterButtonPressed());
      history.push("/filter")
    }
    else{
      toast.dark('You selected no filter', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  useEffect(() => {
    dispatch(getAllColors())
  }, [dispatch])

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
          />
        </InputGroup>
      </div>

      {/* <div style={{width: "25%", "margin-right": "20px"}}>
        <Button variant="primary" onClick={clickFilterHandler} className="filterButton">Primary</Button>
      </div> */}
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
