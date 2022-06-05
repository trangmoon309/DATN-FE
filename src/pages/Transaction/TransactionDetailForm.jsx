import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
    updateUserTransaction,
  } from "../../redux/transactionSlice/userTransactionSlice";
import { useDispatch } from "react-redux";
import './rating.css';

export default function TransactionDetailForm(props) {
    const {content} = props
    const dispatch = useDispatch();
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleReceiveDateChange,
        resetForm
    } = useForm(content, true, null);

    const handleSubmit = e => {
        console.log(values.returnedVehicleDate);
        // dispatch(updateUserTransaction(values)).then((result) => {
        //     }).catch((error) => {
        // });
    }

    let rentalStatusOptions = [
        {"name":"Waiting for rentaling","id": 0},
        {"name":"Using","id": 1},
        {"name":"Returned","id": 2}
      ];
    let costStatusOptions = [
        {"name":"Waiting for paying","id": 0,},
        {"name":"Payed","id": 1,},
        {"name":"Cancel","id": 2}
    ];
    let reviewServiceQualityOptions = [
        {"name":"0","id": 0,},
        {"name":"1","id": 1,},
        {"name":"2","id": 2,},
        {"name":"3","id": 3},
        {"name":"4","id": 4,},
        {"name":"5","id": 5,},
    ];

    var x = new Date(values.receivedVehicleDate)
    var receivedDate = new Date(x.getUTCFullYear(), x.getUTCMonth(), x.getDate());
    var datestring = receivedDate.getFullYear()  + "-" + (receivedDate.getMonth()+1) + "-" + receivedDate.getDate();

    //console.log(datestring);
    return (
        <Form>
            <p>{values.user.name + " " + values.user.surname}</p>
            <Grid container style={{"margin":"20px"}}>
                <Grid item xs={6}>
                    <Controls.Date
                        name="receivedVehicleDate"
                        label="Received Date"
                        value={datestring}
                        disable
                    /> 
                    <Controls.Date
                        name="returnedVehicleDate"
                        label="Returned Date"
                        value={values.returnedVehicleDate}
                        onChange={handleReceiveDateChange}
                    /> 
                    <Controls.Input
                        label="Deposited Cost"
                        value={values.depositCosted}
                        disable
                    />  
                    <Controls.Input
                        name="totalDays"
                        label="Total Days"
                        value={values.totalDays}
                        disable
                    /> 
                    <Controls.Select
                        name="reviewServiceQuality"
                        label="Review Service Quality"
                        value={values.reviewServiceQuality}
                        onChange={handleInputChange}
                        options={reviewServiceQualityOptions}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="costStatus"
                        label="Cost Status"
                        value={values.costStatus}
                        onChange={handleInputChange}
                        options={costStatusOptions}
                    /> 
                    <Controls.Select
                        name="rentalStatus"
                        label="RentalStatus"
                        value={values.rentalStatus}
                        onChange={handleInputChange}
                        options={rentalStatusOptions}
                    />
                    <Controls.Input
                        name="totalCost"
                        label="Total Cost"
                        value={values.totalCost}
                        onChange={handleInputChange}
                    />                     
                    <Controls.Input
                        name="cancelReason"
                        label="Cancel Reason"
                        value={values.cancelReason}
                        onChange={handleInputChange}
                    />
                    <p>Review Service Quality</p>
                    <span className={"rating_"+ values.reviewServiceQuality +"stars"}/>
                </Grid>
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