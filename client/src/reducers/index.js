import { combineReducers } from "redux";
import userReducer from "./user.reduser";
import usersReducer from "./users.reduser";

export default combineReducers({
  userReducer,
  usersReducer,
});
