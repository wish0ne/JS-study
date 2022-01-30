import { createAction, handleActions } from 'redux-actions';

//Ducks 패턴을 사용하여 (액션 타입)+(액션 생성 함수)+(리듀서)를 작성한 코드 = 모듈

// 1. 액션 타입 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
//액션 타입은 대문자로 정의
//'모듈 이름/액션 이름'과 같은 형태로 작성 (액션 이름 충돌 방지)

// 2. 액션 생성 함수
// createAction 사용하면 매번 객체를 직접 만들어줄 필요없이 더욱 간단하게 액션 생성 함수 선언 가능.
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
//export 키워드 통해 이 함수를 다른 파일에서 불러올 수 있도록 함.

//3. 초기 상태
const initialState = {
  number: 0,
};

//4. 리듀서 함수
//현재 상태를 참조하여 새로운 객체를 생성해서 반환하는 코드 작성

// handleActions 함수 사용하여 리듀서 함수 작성
// 첫번째 파라미터에는 각 액션에 대한 업데이트 함수, 두번째 파라미터에는 초기 상태 넣어줌.
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

export default counter;
//export default는 단 한개만 내보낼 수 있음, 불러올때 {}필요 없음 / export는 여러개 내보내기 가능, 불러올때 {} 필요
