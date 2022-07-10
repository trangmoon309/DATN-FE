import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from './../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch } from "react-redux";

export default function CheckOutForm(props) {
    const {setOpenPopup, totalAmounts, submitHandler } = props
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

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    const initialFValues = {
        receivedDate: formatDate(Date.now()),
        totalDays: 1,
        oneDayAmounts: totalAmounts,
        totalAmounts: totalAmounts
    };
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleCartInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    return (
        <Form>
            <Grid container style={{"margin":"20px"}}>
                <Controls.Date
                    name="receivedDate"
                    label="Received Date"
                    value={values.receivedDate}
                /> 
                <Controls.Input
                    name="totalDays"
                    label="Total Days"
                    value={values.totalDays}
                    onChange={handleCartInputChange}
                    error={errors.totalDays}
                />
            </Grid>
            <h2>
             Total Cost: {values.totalAmounts}₹
            </h2>
            <div style={{"margin":"20px"}}>
                <Controls.Button
                    type="button"
                    onClick={() => submitHandler(values.totalAmounts, values.receivedDate, values.totalDays)} 
                    startIcon={<AddCircleIcon />}
                    text="Submit"
                 />
            </div>
        </Form>
    )
}