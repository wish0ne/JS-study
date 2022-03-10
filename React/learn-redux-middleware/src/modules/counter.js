import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//redux-thunk는 액션 생성 함수에서 일반 액션 객체를 반환하는 대신 함수를 반환.
//카운터값을 비동기적으로 변경시키기 위한 함수 생성

//1초 뒤에 increase 혹은 decrease 함수를 디스패치함.
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

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
