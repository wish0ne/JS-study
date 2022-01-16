import React from "react";
import ColorBox from "./components/ColorBox";
import { ColorProvider } from "./contexts/color";
import SelectColors from "./components/SetColors";

//Provider를 사용하면 Context의 value 변경 가능.
//Provider를 사용할때는 value값을 명시해주어야 제대로 작동한다는것 유의!
const App = () => {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
};

export default App;
