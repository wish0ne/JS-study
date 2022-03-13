import logo from "./logo.svg";
import "./App.css";
//import notify from "./notify";

function App() {
  //이렇게 작성하고 빌드하면 notify 코드가 main파일 안에 들어감.
  // const onClick = () => {
  //   notify();
  // };

  //import를 상단에서 하지 않고 import()함수 형태로 메서드 안에서 사용하면 파일을 따로 분리시켜 저장함.
  //그리고 실제 함수가 필요한 시점에 파일을 불러와서 함수 사용 간으.
  const onClick = () => {
    //import를 함수로 사용하면 Promise를 반환함.
    //import를 함수로 사용하는 문법은 표준 자바스크립트는 아님. stage-3단계에 있는 dynamic import 문법.
    //웹팩에서 지원하고 있으므로 바로 사용가능.
    //이 함수를 통해 모듈을 불러올때 default로 내보낸것은 result.default를 참조해야 사용가능.
    import("./notify").then((result) => result.default());
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}>Hello React!</p>
      </header>
    </div>
  );
}

export default App;
