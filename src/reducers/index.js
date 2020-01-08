import postImages from "./postImages";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  image: postImages
});

export default allReducers;
