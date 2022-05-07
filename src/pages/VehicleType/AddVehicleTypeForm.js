import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from './../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import * as FaIcons from 'react-icons/fa';

const initialFValues = {
    id: 0,
    name: '',
    code: '',
    properties: []
}

export default function AddVehicleTypeForm(props) {
    const { addOrEdit, recordForEdit } = props;
    const [propList, setPropList] = useState([{ property: "" }]);
    console.log(propList);

    const handlePropRemove = (index) => {
        const list = [...propList];
        list.splice(index, 1);
        setPropList(list);
      };
    
    const handlePropAdd = () => {
        setPropList([...propList, { service: "" }]);
    };

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
            <p style={{"width": "100%", "text-align": "left"}}>Properties</p>
            {propList &&
                propList.map((singleProp, count) => (
                <Grid container>
                    <Grid item xs={11} style={{"margin-left":"-18px"}}>
                        <Controls.Input
                            name="property"
                            label="Property"
                            value={values.fullName}
                            onChange={handleInputChange}
                            error={errors.fullName}
                        />
                    </Grid>
                    <Grid item xs={1} style={{"padding-top":"15px"}}>
                    <button style={{"align-self":"baseline", "width":"30px", "padding":"5px", "border-radius":"50px"}}
                        type="button"
                        onClick={handlePropRemove}>
                        <FaIcons.FaMinus />
                    </button>
                    </Grid>
                </Grid>
                ))
            }
            <button style={{"align-self":"baseline", "width":"30px", "padding":"5px", "margin-left":"10px", "border-radius":"50px"}}
                    type="button"
                    onClick={handlePropAdd}>
                <FaIcons.FaPlus />
            </button>

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