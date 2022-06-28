import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import * as employeeService from "../../api/employeeService";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UploadFile from './../UploadFile';
import MultiSelect from '../controls/MultiSelect';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    getVehicleTypeList,
} from "../../redux/vehicleSlice/vehicleTypeSlice";
import {
    getVehicleLineList,
} from "../../redux/vehicleSlice/vehicleLineSlice";
import {
    createVehicle,
    updateVehicle,
    updateImgs
} from "../../redux/vehicleSlice/vehicleSlice";

export default function VehicleForm(props) {
    const {recordForEdit,content,setOpenPopup } = props;
    const vehicleTypes = useSelector(state => state.vehicleType.items);
    const vehicleLines = useSelector(state => state.vehicleLine.items);
    const [vehicleProps, setVehicleProps] = useState([]);
    const [selecteVehicledProps, setSelecteVehicledProps] = useState([]);
    const [images, setImages] = useState([]);

    const initialFValues = (recordForEdit == false) ? {
        vehicleTypeId: "",
        vehicleLineId: "",
        code: "",
        name: "",
        color: "",
        kilometerTravel: 0,
        licensePlate: "",
        rentalPrice: 0,
        depositPrice: 0,
        vehicleProperties: []
    } : content;

    // if(recordForEdit == true){
    //     setSelecteVehicledProps(content.vehicleProperties);
    // }

    // if(recordForEdit == true){
    //     setImages(content.vehicleImages);
    // }

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

    useEffect(() => {
        if(vehicleTypes == null || vehicleTypes.length == 0){
            dispatch(getVehicleTypeList({keyWord:'', skipCount:0}))
        }
        if(vehicleLines == null || vehicleLines.length == 0){
            dispatch(getVehicleLineList({keyWord:'', skipCount:0}))
        }
    },[])

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleVehicleTypeSelectChange,
        handleVehiclePropertiesSelectChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        if (recordForEdit != null && recordForEdit === true)
        {
            dispatch(updateVehicle(values)).then((result) => {
                if(images !== ''){
                    dispatch(updateImgs({"vehicleId":result.payload.id, "files": images}));
                }
            }).catch((error) => {
            });	
        }
        else{
            if(!values['name'] || values['name'].length === 0){
                toast.error("Name is required!");
            }
            else{
                dispatch(createVehicle(values)).then((result) => {
                    if(images !== ''){
                        dispatch(updateImgs({"vehicleId":result.payload.id, "files": images}));
                    }
                }).catch((error) => {
                });	
            }
        }
        setOpenPopup(false);
    }

    return (
        <Form style={{"width":"120%"}}>
            <Grid  container >
                <h4>Images Uploading</h4>
                <div style={{"width":"100%", "margin-left":"-90px"}}>
                    <UploadFile
                        images={images}
                        setImages={setImages}
                    ></UploadFile>
                </div>
            </Grid>
            <Grid container style={{"margin":"20px"}}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Select
                        name="vehicleLineId"
                        label="Vehicle Line"
                        value={values.vehicleLineId}
                        onChange={handleInputChange}
                        options={vehicleLines}
                        error={errors.vehicleLineId}
                    /> 
                    <Controls.Select
                        name="vehicleTypeId"
                        label="Vehicle Type"
                        value={values.vehicleTypeId}
                        onChange={(e) => handleVehicleTypeSelectChange(e,vehicleTypes, setVehicleProps)}
                        options={vehicleTypes}
                        error={errors.vehicleTypeId}
                    /> 
                    <MultiSelect
                        items={vehicleProps}
                        name="vehicleTypeDetailId"
                        onChange={(e) => handleVehiclePropertiesSelectChange(e, setSelecteVehicledProps)}
                        valueItems={selecteVehicledProps}
                        setValueItems={setSelecteVehicledProps}
                    /> 
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="kilometerTravel"
                        label="Kilometer Traveled"
                        value={values.kilometerTravel}
                        onChange={handleInputChange}
                        error={errors.kilometerTravel}
                    />
                    <Controls.Input
                        name="amount"
                        label="Amount"
                        value={values.amount}
                        onChange={handleInputChange}
                        error={errors.amount}
                    />
                    <Controls.Input
                        name="rentalPrice"
                        label="Rental Price"
                        value={values.rentalPrice}
                        onChange={handleInputChange}
                        error={errors.rentalPrice}
                    />
                    <Controls.Input
                        name="depositPrice"
                        label="Deposit Price"
                        value={values.depositPrice}
                        onChange={handleInputChange}
                        error={errors.depositPrice}
                    />
                </Grid>
            </Grid>

            <div style={{"margin":"20px"}}>
                <Controls.Button
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
