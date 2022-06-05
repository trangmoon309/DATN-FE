import { configureStore } from "@reduxjs/toolkit";
import colorSlice from "./colorSlice/colorSlice";
import userSlice from "./userSlice/userSlice";
import vehicleLineSlice from "./vehicleSlice/vehicleLineSlice";
import vehicleTypeSlice from "./vehicleSlice/vehicleTypeSlice";
import vehicleSlice from "./vehicleSlice/vehicleSlice";
import userTransactionSlice from "./transactionSlice/userTransactionSlice";
import userCartSlice from "./transactionSlice/userCartSlice";

export default configureStore({
  reducer: {
    color: colorSlice,
    user: userSlice,
    vehicleLine:vehicleLineSlice,
    vehicleType: vehicleTypeSlice,
    vehicle: vehicleSlice,
    userTransaction: userTransactionSlice,
    userCart: userCartSlice,
  },
});
