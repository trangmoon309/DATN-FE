import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from './../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import * as FaIcons from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
    createVehicleType,
    updateVehicleType,
  } from "../../redux/vehicleSlice/vehicleTypeSlice";

export default function AddVehicleTypeForm(props) {
    const {recordForEdit,content,setOpenPopup } = props;
    const initialFValues = (recordForEdit === false) ? {
        id: 0,
        name: '',
        code: '',
        vehicleTypeDetails: []
    } : content;

    const dispatch = useDispatch();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleVehicleTypePropsChange,
        handleVehicleTypePropRemove,
        handleVehicleTypePropAdd,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        values.vehicleTypeDetails.forEach(x => {
            if(Number.isInteger(x.id)){
                x.id = null;
            }
        });
        if (recordForEdit != null && recordForEdit === true)
        {
            dispatch(updateVehicleType(values)).then((result) => {
            }).catch((error) => {
            });	
        }
        else{
            if(!values['name'] || values['name'].length === 0){
                toast.error("Name is required!");
            }
            else if(values.vehicleTypeDetails.some(x => (!x['name'] || x['name'].length === 0)))
            {
                toast.error("Name is required!");
            }
            else{
                dispatch(createVehicleType(values)).then((result) => {
                }).catch((error) => {
                });	
            }
        }
        setOpenPopup(false);
    }

    return (
        <Form>
            <Grid container style={{"margin":"20px"}}>
                <Controls.Input
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleInputChange}
                    error={errors.name}
                />
            </Grid>
            <p style={{"width": "100%", "text-align": "left"}}>Properties</p>
            {values.vehicleTypeDetails &&
                values.vehicleTypeDetails.map((item, index) => (
                <Grid container>
                    <Grid item xs={11} style={{"margin-left":"-18px"}}>
                        <Controls.Input
                            name={item.id !== null ? item.id : index}
                            label="Property"
                            value={item.name}
                            onChange={handleVehicleTypePropsChange}
                            error={errors.name}
                        />
                    </Grid>
                    <Grid item xs={1} style={{"padding-top":"15px"}}>
                    <button style={{"align-self":"baseline", "width":"30px", "padding":"5px", "border-radius":"50px"}}
                        type="button"
                        onClick={() => handleVehicleTypePropRemove(index)}>
                        <FaIcons.FaMinus />
                    </button>
                    </Grid>
                </Grid>
                ))
            }
            <button style={{"align-self":"baseline", "width":"30px", "padding":"5px", "margin-left":"10px", "border-radius":"50px"}}
                    type="button"
                    onClick={() => handleVehicleTypePropAdd(values.vehicleTypeDetails.length)}>
                    <FaIcons.FaPlus />
            </button>

            <div style={{"margin":"20px"}}>
                <Controls.Button
                    type="button"
                    onClick={handleSubmit} 
                    startIcon={<AddCircleIcon />}
                    text="Submit" />
                <Controls.Button
                    text="Reset"
                    color="default"
                    startIcon={<RestartAltIcon />}
                    onClick={resetForm} />
            </div>
        </Form>
    )
}