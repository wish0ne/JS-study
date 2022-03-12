import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";
import { startLoading, finishLoading } from "./loading";

//액션 타입 선언
//한 요청당 3개 만들어야함 (시작/성공/실패)
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action) {
  yield put(startLoading(GET_POST)); //로딩 시작
  //파라미터로 action을 받아오면 액션의 정보를 조회할 수 있음.
  try {
    //call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있음.
    //첫번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
    const post = yield call(api.getPost, action.payload); //api.getPost(action.payload)를 의미
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    //에러 잡기
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST));
}

function* getUsersSaga() {
  yield put(startLoading(GET_USERS));
  try {
    const users = yield call(api.getUsers);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS));
}

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

//초기 상태 선언
//요청의 로딩중 상태는 loading 객체에서 관리
const initialState = {
  post: null,
  users: null,
};

//2개 이상의 액션을 처리하려면 handleAction이 아니라 handleActions 사용
//이제 sample 리듀서에서 로딩중에 관한 상태를 관리할 필요 없음. 성공했을때만 관리
//추가로 실패했을때를 관리하고 싶다면 _FAILURE가 붙은 액션을 리듀서에서 처리하거나, 컨테이너 컴포넌트에서 try/catch 구문을 사용하여 에러값을 조회하면됨.
const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, //요청 완료
      },
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
      users: action.payload,
    }),
  },
  initialState
);

export default sample;
