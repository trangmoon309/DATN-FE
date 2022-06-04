import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, OutlinedInput } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));
  
export default function MultiSelect(props) {
    const { name, items, onChange, valueItems } = props;
    const classes = useStyles();

    return (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">
              Names here to select from
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={valueItems}
              name={name}
              onChange={onChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.map(obj=> {
                let  targetIndex = items.findIndex(f=>f.id==obj); 
                let object = items[targetIndex];
                return object.name;
              }).join(", ")}
            >
              {items.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <Checkbox checked={valueItems.indexOf(item.id) > -1} />
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      );
}
