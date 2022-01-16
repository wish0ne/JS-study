import React from "react";
import { ColorConsumer } from "../contexts/color";

//Consumer 사용하기
const ColorBox = () => {
  return (
    <ColorConsumer>
      {/* 색상을 props로 받아오는 대신 ColorContext안에 들어있는 Consumer라는 컴포넌트를 통해 색상을 조회 */}
      {/* Consumer안에 함수를 넣어줌. 이러한 패턴을 Function as a child, 혹은 Render Props라고함. */}
      {/* 객체 비구조화 할당 사용하여 value 조회 생략 */}
      {({ state }) => (
        <>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: state.color,
            }}
          />
          <div
            style={{
              width: "32px",
              height: "32px",
              background: state.subcolor,
            }}
          />
        </>
      )}
    </ColorConsumer>
  );
};

export default ColorBox;
