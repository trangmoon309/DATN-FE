import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
        const data = {...values};
        setValues({
            data,
            [name]: value,
          });
        if (validateOnChange)
            validate({ [name]: value })
    }

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
        resetForm,
        resetFormProfile
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

