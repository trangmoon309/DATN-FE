import { configureStore } from "@reduxjs/toolkit";
import carSlice from "./carSlice/carSlice";
import colorSlice from "./colorSlice/colorSlice";
import userSlice from "./userSlice/userSlice";
import filterSlice from "./filterSlice/filterSlice";
import rentalSlice from "./rentalSlice/rentalSlice";
import searchBarSlice from "./searchBarSlice/searchBarSlice";
import vehicleLineSlice from "./vehicleSlice/vehicleLineSlice";
import vehicleTypeSlice from "./vehicleSlice/vehicleTypeSlice";
import vehicleSlice from "./vehicleSlice/vehicleSlice";

export default configureStore({
  reducer: {
    cars: carSlice,
    color: colorSlice,
    filter: filterSlice,
    search: searchBarSlice,
    user: userSlice,
    rental:rentalSlice,
    vehicleLine:vehicleLineSlice,
    vehicleType: vehicleTypeSlice,
    vehicle: vehicleSlice
  },
});
