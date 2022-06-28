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

export default function TransactionDetailReviewForm(props) {
    const {content, setOpenPopup} = props
    const dispatch = useDispatch();

    const {
        values,
        handleInputChange,
        handleRideQualityReviewChange,
        handleEngineQualityReviewChange,
        handleNoteReviewChange,
        resetForm
    } = useForm(content, true, null);

    const handleSubmit = e => {
        dispatch(updateUserTransaction(values)).then((result) => {
            setOpenPopup(false);
            }).catch((error) => {
        });
    }

    let reviewServiceQualityOptions = [
        {"name":"0","id": 0,},
        {"name":"1","id": 1,},
        {"name":"2","id": 2,},
        {"name":"3","id": 3},
        {"name":"4","id": 4,},
        {"name":"5","id": 5,},
    ];

    return (
        <Form>
            <p>{values.user.name + " " + values.user.surname}</p>
            {values.userTransactionVehicles.map((vehiclex, index) => {
                return(
                    <div style={{"width":"120%", "margin-left":"100px","margin-right":"100px"}}>
                        <h3 style={{"width":"100%", "text-align":"left"}}>{vehiclex.vehicle.name}'s Review</h3>
                        <Grid container style={{"width":"100%"}}>
                            <Grid item xs={6}>
                                <Controls.Select
                                    name= {index}
                                    label="Review Engine Quality"
                                    value={vehiclex.reviewEngineQuality}
                                    onChange={handleEngineQualityReviewChange}
                                    options={reviewServiceQualityOptions}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <p>Engine Quality</p>
                                <span className={"rating_"+ vehiclex.reviewEngineQuality +"stars"}/>
                            </Grid>
                        </Grid>
                        <Grid container style={{"width":"100%"}}>
                            <Grid item xs={6}>
                            <Controls.Select
                                name= {index}
                                label="Review Ride Quality"
                                value={vehiclex.reviewRideQuality}
                                onChange={handleRideQualityReviewChange}
                                options={reviewServiceQualityOptions}
                            />
                            </Grid>
                            <Grid item xs={6}>
                                <p>Ride Quality</p>
                                <span className={"rating_"+ vehiclex.reviewRideQuality +"stars"}/>
                            </Grid>
                        </Grid>
                        <Grid container style={{"width":"100%","margin-left":"18px"}}>
                            <Controls.Input
                                name= {index}
                                label="Review Note"
                                onChange={handleNoteReviewChange}
                                value={vehiclex.reviewNote}
                            />
                        </Grid>
                    </div>
                )    
            })}

            <div style={{"width":"120%", "margin-left":"100px","margin-right":"100px", "margin-top":"30px"}}>
                <h3 style={{"width":"100%", "text-align":"left"}}>General Review</h3>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Select
                            name="reviewServiceQuality"
                            label="Review Service Quality"
                            value={values.reviewServiceQuality}
                            onChange={handleInputChange}
                            options={reviewServiceQualityOptions}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <p>Review Service Quality</p>
                        <span className={"rating_"+ values.reviewServiceQuality +"stars"}/>
                    </Grid>
                </Grid>
            </div>
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