import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from './../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
    createVehicleLine,
    updateVehicleLine,
  } from "../../redux/vehicleSlice/vehicleLineSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function AddVehicleLineForm(props) {
    const {recordForEdit,content,setOpenPopup } = props
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
    
    const initialFValues = (recordForEdit === false) ? {
        name: '',
        code: '',
    } : content;
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        if (recordForEdit != null && recordForEdit === true)
        {
            dispatch(updateVehicleLine(values)).then((result) => {
            }).catch((error) => {
            });	
        }
        else{
            if(!values['name'] || values['name'].length === 0){
                toast.error("Name is required!");
            }
            else{
                dispatch(createVehicleLine(values)).then((result) => {
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