import React, { createContext, useState } from "react";

//새 Context를 만들때는 createContext 함수 사용. 파라미터에는 해당 Context의 기본상태를 지정
//이 기본값은 Provider를 사용하지 않았을때만 사용됨.
//만약 Provider는 사용했는데 value를 명시하지 않았다면, 이 기본값을 사용하지 않기 때문에 오류 발생

//Context의 value에는 함수도 전달가능.
//createContext의 기본값은 실제 Provider의 value에 넣는 객체의 형태와 일치시켜주는것이 좋음.
const ColorContext = createContext({
  state: { color: "black", subcolor: "red" },
  actions: {
    setColor: () => {},
    setSubColor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  //Provider의 value에서 상태는 state로, 업데이트 함수는 actions으로 묶어서 전달하고 있음.
  //Context에서 값을 동적으로 사용할때 반드시 묶어줄 필요는 없지만 state, actions 객체를 따로 분리해주면 나중에 다른 컴포넌트에서 Context의 값을 사용할때 편리함.
  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

//const ColorConsumer = ColorContext.Consumer와 같은 의미
const { Consumer: ColorConsumer } = ColorContext;

//ColorProvider와 ColorConsumer 내보내기
export { ColorProvider, ColorConsumer };

export default ColorContext;
