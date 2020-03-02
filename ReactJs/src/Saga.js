import { fork, all } from "redux-saga/effects";
import homeSaga from "./containers/Home/Saga";
export default function* twitterSaga(dispatch) {
  yield all([fork(homeSaga)]);
}
