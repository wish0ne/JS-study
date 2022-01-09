import React, { useReducer } from "react";

//리듀서 : 현재 상태와 업데이트를 위해 필요한 정보를 담은 액션값을 전달받아 새로운 값을 반환하는 함수.
//리듀서 함수에서 새로운 상태를 만들때는 불변성을 지켜야함!
function reducer(state, action) {
  //action.type에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      //아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const Counter = () => {
  //useReducer(리듀서 함수, 해당 리듀서의 기본값) -> 호출하면 state값과 dispatch 함수 받아옴
  //state값 : 현재 가리키고 있는 상태
  //dispatch : 액션을 발생시키는 함수. dispatch(action)처럼 함수안에 액션을 넣어주면 리듀서 함수가 호출됨.
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};

export default Counter;
