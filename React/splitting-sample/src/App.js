import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

//state를 사용한 코드 스플리팅 (매번 state를 선언해주어야 하는 점이 불편)
class App extends Component {
  state = {
    SplitMe: null,
  };
  handleClick = async () => {
    //SplitMe 컴포넌트를 불러와 state에 넣음.
    const loadedModule = await import("./SplitMe");
    this.setState({
      SplitMe: loadedModule.default,
    });
  };
  render() {
    const { SplitMe } = this.state;
    //state의 SplitMe가 유효하면 SplitMe 컴포넌트 렌더링
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handleClick}>Hello React!</p>
          {SplitMe && <SplitMe />}
        </header>
      </div>
    );
  }
}

export default App;
