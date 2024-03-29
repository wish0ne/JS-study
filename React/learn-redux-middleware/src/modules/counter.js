import { createAction, handleActions } from "redux-actions";
import {
  delay,
  put,
  takeEvery,
  takeLatest,
  select,
  throttle,
} from "redux-saga/effects";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//마우스 클릭 이벤트가 payload안에 들어가지 않도록 ()=>undefined를 두번째 파라미터로 넣어줌.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); //1초 기다림
  yield put(increase()); //특정 액션을 디스패치
  //select를 사용하여 사가 내부에서 현재 상태를 참조
  const number = yield select((state) => state.counter); //state는 스토어 상태를 의미함.
  console.log(`현재 값은 ${number}입니다.`);
}

function* decreaseSaga() {
  yield delay(1000); //1초 기다림
  yield put(decrease()); //특정 액션을 디스패치
}

export function* counterSaga() {
  //사가가 실행되는 주기를 제한가능. throttle을 사용하면 사가가 n초에 한번만 호출되도록 설정가능.
  //3초에 한번만 increaseSaga가 호출됨.
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);
  //takeLatest는 기존에 진행중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

//상태는 꼭 객체일 필요 없음. 숫자도 작동.
const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
