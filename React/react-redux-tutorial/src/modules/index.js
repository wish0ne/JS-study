//루트 리듀서 만들기
// createStore 함수를 사용하여 스토어를 만들때는 리듀서를 하나만 사용해야함.
// 따라서 기존에 만들었던 리듀서를 하나로 합쳐줘야함 -> 리덕스의 combineReducers라는 유틸함수로 쉽게 처리가능.

import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
