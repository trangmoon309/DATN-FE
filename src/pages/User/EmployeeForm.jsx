import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from './../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AvatarForm from './Avatar';
import { useDispatch, useSelector } from "react-redux";
import {
    udpateProfile
} from "../../redux/userSlice/userSlice";

export default function EmployeeForm() {
    //const currentUser = useSelector((state) => state.user.currentUser);
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const genderItems = [{ id: 'Male', title: 'Male', value: 'Male' },
        { id: 'Female', title: 'Female', value: 'Female' },
        { id: 'Other', title: 'Other', value: 'Other' },
    ]

    console.log(currentUser);
    var innitializeValue = currentUser;
    
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
        handleInputProfileChange,
        resetFormProfile
    } = useForm(innitializeValue, true, validate);

    const handleSubmit = e => {
        dispatch(udpateProfile(values));
        // .then(() =>
            
        // );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <AvatarForm></AvatarForm>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="First Name"
                        value={values.name}
                        onChange={handleInputProfileChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="surname"
                        label="Last Name"
                        value={values.surname}
                        onChange={handleInputProfileChange}
                        error={errors.surname}
                    />                    
                    <Controls.Input
                        label="Mobile"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleInputProfileChange}
                        error={errors.phoneNumber}
                    />
                    <Controls.Input
                        label="Address"
                        name="address"
                        value={values.extraInfors.address}
                        onChange={handleInputProfileChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.extraInfors.gender}
                        onChange={handleInputProfileChange}
                        items={genderItems}
                    />
                    <Controls.Input
                        label="ID Number"
                        name="idNumber"
                        value={values.extraInfors.idNumber}
                        onChange={handleInputProfileChange}
                    />
                    <Controls.Input
                        label="Driver License"
                        name="driverLicense"
                        value={values.extraInfors.driverLicense}
                        onChange={handleInputProfileChange}
                    />                    
                </Grid>
            </Grid>
            <div style={{"margin-top":"20px"}}>
                <Controls.Button
                type="button"
                startIcon={<AddCircleIcon />}
                onClick={handleSubmit} 
                text="Submit" />
                <Controls.Button
                text="Reset"
                color="default"
                startIcon={<RestartAltIcon />}
                onClick={resetFormProfile} />
            </div>
            <div style={{"margin-top":"40px"}}>
            </div>
        </Form>
    )
}