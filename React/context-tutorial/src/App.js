import React from "react";
import ColorBox from "./components/ColorBox";
import ColorContext from "./contexts/color";

//Provider를 사용하면 Context의 value 변경 가능.
//Provider를 사용할때는 value값을 명시해주어야 제대로 작동한다는것 유의!
const App = () => {
  return (
    <ColorContext.Provider value={{ color: "red" }}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
};

export default App;
