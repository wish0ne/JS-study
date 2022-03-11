import { createAction, handleActions } from "redux-actions";

//요청의 로딩상태를 관리하는 작업 개선.
//리듀서 내부에서 각 요청에 관련된 액션이 디스패치될때마다 로딩상태를 변경해주는 것에서 -> 로딩상태만 관리하는 리덕스 모듈을 따로 생성하여 처리

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

//요청을 위한 액션타입을 payload로 설정(ex) "sample/GET_POST")

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
