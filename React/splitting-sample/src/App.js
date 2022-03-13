import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import loadable from "@loadable/component";
const SplitMe = loadable(() => import("./SplitMe"), {
  //로딩중에 다른 UI를 보고싶을때
  fallback: <div>loading...</div>,
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  //컴포넌트를 미리 불러오는 preload 방법.
  const onMouseOver = () => {
    SplitMe.preload();
  };
  //마우스를 Hello React!위에 올리기만 해도 로딩이 시작됨. (로딩만 하고 렌더링은 하지 않음)
  //그리고 클릭했을때 렌더링됨.
  //preload를 통해 더 좋은 UX 제공 가능!
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!
        </p>
        {visible && <SplitMe />}
      </header>
    </div>
  );
}

export default App;
