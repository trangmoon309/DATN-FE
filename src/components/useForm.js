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
    }

    // User Cart
    const handleCartInputChange = e => {
        const { name, value } = e.target;
        let currentAmount = values.oneDayAmounts;
        if(name == "totalDays"){
            currentAmount = currentAmount*value;
        }
        setValues({
            ...values,
            ["totalAmounts"]: currentAmount,
            [name]: value,
          })
    }

    // User Transaction
    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const handleRideQualityReviewChange = e => {
        const { name, value } = e.target;
        const list = [...values.userTransactionVehicles];
        const targetIndex = name; 
        let object = {...list[targetIndex]};
        object.reviewRideQuality=value;
        list[targetIndex] = object;
        setValues({
            ...values,
            userTransactionVehicles: list,
        });
    }

    const handleEngineQualityReviewChange = e => {
        const { name, value } = e.target;
        const list = [...values.userTransactionVehicles];
        const targetIndex = name; 
        let object = {...list[targetIndex]};
        object.reviewEngineQuality=value;
        list[targetIndex] = object;
        setValues({
            ...values,
            userTransactionVehicles: list,
        });
    }

    const handleNoteReviewChange = e => {
        const { name, value } = e.target;
        const list = [...values.userTransactionVehicles];
        const targetIndex = name; 
        let object = {...list[targetIndex]};
        object.reviewNote=value;
        list[targetIndex] = object;
        setValues({
            ...values,
            userTransactionVehicles: list,
        });
    }

    const handleReceiveDateChange = e => {
        const { name, value } = e.target;
        var receivedDate = new Date(convert(values.receivedVehicleDate));
        var returnDate = new Date(value);
        const diffTime = Math.abs(returnDate - receivedDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        let userTransactionVehicles = values.userTransactionVehicles;
        let totalCost = 0;
        if(userTransactionVehicles.length > 0){
            userTransactionVehicles.forEach(item => {
                totalCost += item.vehicle.rentalPrice;
            })
        }
        
        setValues({
            ...values,
            ["totalDays"]: diffDays,
            ["totalCost"]: totalCost,
            [name]: value,
          });
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
        handleReceiveDateChange,
        handleCartInputChange,
        // Transaction Review
        handleRideQualityReviewChange,
        handleEngineQualityReviewChange,
        handleNoteReviewChange,
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

