import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from './../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const initialFValues = {
    id: 0,
    name: '',
    code: '',
}

export default function AddVehicleLineForm(props) {
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
            <Grid container style={{"margin":"20px"}}>
                <Controls.Input
                    name="name"
                    label="Name"
                    value={values.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                />
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