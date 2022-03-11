import { handleActions } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";

//액션 타입 선언
//한 요청당 3개 만들어야함 (시작/성공/실패)
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";

//thunk 함수 생성
//thunk 함수 내부에서는 시작할때, 성공했을때, 실패했을때 다른 액션을 디스패치.
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

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
