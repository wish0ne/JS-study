import { createStore } from "redux";

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

//액션 이름
// 문자열 형태로, 주로 대문자로 작성하며 고유해야함.
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

//액션 이름을 사용하여 액션 객체를 만드는 액션 생성함수.
//액션 객체는 type값 필수
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

//초기값 설정
//초기값의 형태는 자유. 문자열, 숫자, 객체 등 상관없음
const initialState = {
  toggle: false,
  counter: 0,
};

//리듀서 함수 정의
//리듀서는 변화를 일으키는 함수. 함수의 파라미터로는 state와 action값을 받아옴.

//리듀서가 맨 처음 호출될때는 state값이 undefined.
//undefined일때는 initialState를 기본값으로 설정하기 위해 함수의 파라미터쪽에 기본값을 설정함.
//state가 undefined일때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  //action.type에 따라 다른 작업을 처리
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        //리듀서에서는 상태의 불변성을 유지하면서 데이터에 변화를 일으켜줘야함.
        //그러기 위해 spread 연산자 사용.
        //단 객체의 구조가 복잡해지면 번거롭고 가독성도 나빠지기 때문에 리덕스의 상태는 깊지않은 구조로 관리하는것이 좋다.
        //객체의 구조가 복잡해지거나 배열도 다룰 경우 immer 라이브러리를 사용하면 더 쉽게 리덕스 작성 가능.
        ...state, //불변성 유지를 해주어야함.
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

//스토어 생성 : createStore 함수 사용
//함수의 파라미터에는 리듀서 함수 넣음.
//store에는 다양한 내장함수 존재
const store = createStore(reducer);

//render 함수 작성
//이 함수는 상태가 업데이트될때마다 호출되며, UI의 속성을 상태에 따라 변경해줌.
const render = () => {
  const state = store.getState(); //현재 상태를 불러옴.
  //토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }

  //카운터 처리
  counter.innerText = state.counter;
};

render();

// 스토어의 상태가 바뀔때마다 render 함수가 호출되도록 스토어의 내장함수인 subscribe를 사용.
// subscribe 함수는 파라미터로 함수형태의 값을 받고, 이 함수는 액션이 발생하여 상태가 업데이트될때마다 호출됨.
// 리액트 프로젝트에서는 react-redux 라이브러리가 이 역할 수행
store.subscribe(render); //상태가 업데이트될때마다 render 함수 호출하도록 함.

//액션 발생시키기 = 디스패치
//각 DOM 요소에 클릭 이벤트 설정, 이벤트 함수 내부에서는 dispatch 함수를 사용하여 액션을 스토어에게 전달.
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
