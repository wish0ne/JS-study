import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 1. 액션 타입 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; //새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; //todo를 체크/체크 해제함
const REMOVE = 'todos/REMOVE'; //todo를 제거함.

// 2. 액션 생성 함수 만들기
//액션 생성 함수가 전달받은 파라미터가 액션 객체 안에 추가 필드로 들어감.

//createAction으로 액션 생성 함수 재작성
//createAction으로 액션을 만들때 액션에 필요한 추가 데이터는 payload가 됨.
// 액션 생성 함수에서 받아온 파라미터를 그대로 payload에 넣고싶지 않다면 createAction의 두번째 함수에 payload를 정의하는 함수를 선언.
export const changeInput = createAction(CHANGE_INPUT, (input) => input);

let id = 3; //insert가 호출될때마다 1씩 더해짐.

export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

//파라미터를 그대로 반환하는 함수는 생략해도 되지만, 이 함수를 넣음으로써 코드를 보았을때 이 액션 생성함수의 파라미터로 어떤값이 필요한지 쉽게 파악할 수 있다.
export const toggle = createAction(TOGGLE, (id) => id);

export const remove = createAction(REMOVE, (id) => id);

// 3. 초기 상태
const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ],
};

// 4. 리듀서 함수 만들기
// 객체에 한개 이상의 값이 들어가므로 불변성을 유지해줘야함.

//handleAction으로 리듀서 재작성
// createAction으로 만든 액션 생성 함수는 파라미터로 받아온 값을 객체 안에 넣을때 action.payload라는 이름을 공통적으로 넣어주게 됨.
//따라서 모두 action.payload값을 조회하여 업데이트하도록 구현해줘야한다.
//모든 추가 데이터값을 action.payload로 사용하기 때문에 코드가 헷갈릴 수 있음. => 객체 비구조화 할당 문법으로 action값의 payload일므을 새로 설정해주면 의미파악 쉬움.

//immer를 사용한다고 해서 모든 업데이트 함수에 immer 적용할 필요 없음.
//아래 역시 toggle을 제외한 업데이트 함수들은 immer를 쓰지 않는 코드가 더 짧기 때문에 이전 형태를 유지하는것도 무방하다.
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, (draft) => {
        draft.todos.push(todo);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState,
);

export default todos;
