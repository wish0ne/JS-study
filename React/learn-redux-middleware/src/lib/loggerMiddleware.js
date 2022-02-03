// function loggerMiddleware(store) {
//   return function (next) {
//     return function (action) {
//       //미들웨어 기본 구조
//     };
//   };
// }

//위와 같은 구조의 함수. 미들웨어는 함수를 반환하는 함수를 반환하는 함수.
//store : 리덕스 스토어 인스턴스 / action : 디스패치된 액션
//next : 함수 형태이며, store.dispatch와 비슷한 역할. next(action)을 호출하면 그 다음 처리해야할 미들웨어들에게 액션을 넘겨주고, 만약 그 다음 미들웨어가 없다면 리듀서에게 액션을 넘겨줌.
//미들웨어에서 next를 사용하지 않으면 액션에 리듀서에게 전달되지 않음. (액션이 무시됨)

//로깅 미들웨어 작성. 액션이 디스패치될때마다 액션의 정보와, 액션이 디스패치되기 전후의 상태를 콘솔에 보여줌.
const loggerMiddleware = (store) => (next) => (action) => {
  //미들웨어 기본 구조
  //console.group : console.log를 그룹으로 묶어서 출력
  //console.group(그룹명) : 그룹 시작
  //console.groupEnd(): 그룹 끝
  console.group(action && action.type); //액션 타입으로 log를 그룹화함.
  console.log("이전 상태", store.getState());
  console.log("액션", action);
  next(action); //다음 미들웨어 혹은 리듀서에게 전달
  console.log("다음 상태", store.getState()); //업데이트된 상태
  console.groupEnd(); //그룹 끝
};

export default loggerMiddleware;
