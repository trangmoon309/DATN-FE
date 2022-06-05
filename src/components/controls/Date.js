import React from 'react'
import { TextField } from '@material-ui/core';

export default function Date(props) {

    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            type="date"
            defaultValue="2017-05-24"
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}
