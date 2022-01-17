import React, { useContext } from "react";
import ColorContext from "../contexts/color";

//Consumer대신 useContext hook으로 함수형 컴포넌트에서 Context 사용가능.
//children에 함수를 전달하는 Render Props 패턴 대신 useContext hook을 사용해 Context 값 조회 가능.
const ColorBox = () => {
  const { state } = useContext(ColorContext);

  return (
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
  );
};

export default ColorBox;
