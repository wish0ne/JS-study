import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import sample from "./sample";
import loading from "./loading";

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

//루트 사가를 만들어줌.
export function* rootSaga() {
  //all함수는 여러 사가를 합쳐주는 역할
  yield all([counterSaga()]);
}

export default rootReducer;
