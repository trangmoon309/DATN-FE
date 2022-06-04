import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
          });
        if (validateOnChange)
            validate({ [name]: value })
    }

    // Vehicle
    const handleVehicleTypeSelectChange = (e, vehicleTypes, setProps) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
          });
        if (validateOnChange)
            validate({ [name]: value })
        const targetIndex = vehicleTypes.findIndex(f=>f.id==value); 
        let object = vehicleTypes[targetIndex]; 
        setProps(object.vehicleTypeDetails);
    }

    const handleVehiclePropertiesSelectChange = (e, setValueItems) => {
        const { name, value } = e.target;
        setValueItems(
            // On autofill we get a the stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        var list = [];
        value.forEach((item) => {
            list.push({[name]: item})
        });
        setValues({
            ...values,
            vehicleProperties: list    
        });
    }

    // Vehicle Type
    const handleVehicleTypePropsChange = e => {
        const { name, value } = e.target;
        const list = [...values.vehicleTypeDetails];
        const targetIndex = values.vehicleTypeDetails.findIndex(f=>f.id==name); 
        let object = {...list[targetIndex]};
        object.name=value;
        list[targetIndex] = object;

        setValues({
            ...values,
            vehicleTypeDetails: list    
        });
    }

    const handleVehicleTypePropRemove = (index) => {
        const list = [...values.vehicleTypeDetails];
        list.splice(index, 1);
        setValues({
            ...values,
            vehicleTypeDetails: list    
        });
    };
    
    const handleVehicleTypePropAdd = (index) => {
        const list = [...values.vehicleTypeDetails];
        list.push({id: index, name:""});
        setValues({
            ...values,
            vehicleTypeDetails: list    
        });
    };

    // Profile
    const handleInputProfileChange = e => {
        const { name, value } = e.target;
        const extraProps = ['age','address','avatarId','idNumber','driverLicense','gender'];

        if(extraProps.includes(name)){
            setValues({
                ...values,
                extraInfors: {
                  ...values.extraInfors,
                  [name]: value,
                },
              });
        }else {
            setValues({
                ...values,
                [name]: value,
              });
        }
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetFormProfile = () => {
        initialFValues.name = '';
        initialFValues.surname = '';
        initialFValues.phoneNumber = '';
        initialFValues.extraInfors.address = '';
        initialFValues.extraInfors.avatarId = '';
        initialFValues.extraInfors.idNumber = '';
        initialFValues.extraInfors.driverLicense = '';
        initialFValues.extraInfors.gender = '';
        setValues(initialFValues);
        setErrors({})
    }

    const resetForm = () => {
        initialFValues.name = '';
        initialFValues.surname = '';
        initialFValues.phoneNumber = '';
        initialFValues.extraInfors.address = '';
        initialFValues.extraInfors.avatarId = '';
        initialFValues.extraInfors.idNumber = '';
        initialFValues.extraInfors.driverLicense = '';
        initialFValues.extraInfors.gender = '';
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleInputProfileChange,
        handleVehicleTypePropsChange,
        handleVehicleTypePropRemove,
        handleVehicleTypePropAdd,
        handleVehicleTypeSelectChange,
        handleVehiclePropertiesSelectChange,
        resetForm,
        resetFormProfile,
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

