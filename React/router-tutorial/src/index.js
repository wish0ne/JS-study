import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

//프로젝트에 리액트 라우터 적용할때는 index.js파일에서 BrowserRouter 컴포넌트를 사용하여 감싸면됨.
//이 컴포넌트는 웹 애플리케이션에 HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고,
//현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해줌.
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
