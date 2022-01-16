import React from "react";
import ColorContext from "../contexts/color";

//Consumer 사용하기
const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {/* 색상을 props로 받아오는 대신 ColorContext안에 들어있는 Consumer라는 컴포넌트를 통해 색상을 조회 */}
      {/* Consumer안에 함수를 넣어줌. 이러한 패턴을 Function as a child, 혹은 Render Props라고함. */}
      {(value) => (
        <div
          style={{ width: "64px", height: "64px", background: value.color }}
        />
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;
