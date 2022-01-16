import { createContext } from "react";

//새 Context를 만들때는 createContext 함수 사용. 파라미터에는 해당 Context의 기본상태를 지정
//이 기본값은 Provider를 사용하지 않았을때만 사용됨.
//만약 Provider는 사용했는데 value를 명시하지 않았다면, 이 기본값을 사용하지 않기 때문에 오류 발생
const ColorContext = createContext({ color: "black" });

export default ColorContext;
