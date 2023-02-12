import { combineReducers } from "redux";
import userReducer from "./user.reduser";
import usersReducer from "./users.reduser";
import postReducer from "./post.reduser";

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
});
