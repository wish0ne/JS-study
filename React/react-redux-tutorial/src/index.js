import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import rootReducer from './modules';

// 스토어 만들고 리액트 애플리케이션에 리덕스 적용하는건 index.js에서

//redux-devtools-extension & 크롬 확장 프로그램(Redux devTools) 사용하여 리덕스 개발자 도구 이용
const store = createStore(rootReducer, composeWithDevTools());

// 리액트 컴포넌트에서 스토어를 사용할 수 있도록 App 컴포넌트를 Provider 컴포넌트로 감싸줌.
// 이때 store를 props로 전달해줘야함.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
