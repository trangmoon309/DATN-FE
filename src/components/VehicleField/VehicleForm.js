import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import * as employeeService from "../../api/employeeService";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UploadFile from './../UploadFile';

const initialFValues = {
    id: 0,
    name: '',
    code: '',
    vehicleTypeId: '',
    vehicleLineId: '',
    color: 'male',
    numberOfSeat: '',
    licensePlate: '',
    rentalPrice: 0,
    depositPrice: 0,
    images: []
}

export default function VehicleForm(props) {
    const { addOrEdit, recordForEdit } = props

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
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid  container >
                <h4>Images Uploading</h4>
                <div style={{"width":"100%"}}>
                    <UploadFile></UploadFile>
                </div>
            </Grid>
            <Grid container style={{"margin":"20px"}}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Select
                        name="vehicleTypeId"
                        label="Vehicle Type"
                        value={values.vehicleTypeId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.vehicleTypeId}
                    />
                    <Controls.Select
                        name="vehicleLineId"
                        label="Vehicle Line"
                        value={values.vehicleTypeId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.vehicleTypeId}
                    />
                    <Controls.Input
                        label="color"
                        name="Color"
                        value={values.color}
                        onChange={handleInputChange}
                        error={errors.color}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="numberOfSeat"
                        label="Number Of Seat"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        error={errors.departmentId}
                    />
                    <Controls.Input
                        name="licensePlate"
                        label="License Plate"
                        value={values.licensePlate}
                        onChange={handleInputChange}
                        error={errors.licensePlate}
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
                    type="submit"
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
