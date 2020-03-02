import { combineReducers } from "redux";
import { reducer as homeReducer } from "./containers/Home/Reducer";
export default function reducer(asyncReducers) {
  return combineReducers({
    home: homeReducer
  });
}
