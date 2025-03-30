import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./redux-auth";

const combineReducer = combineReducers({
  auth: authReducer,
});

export default combineReducer;
