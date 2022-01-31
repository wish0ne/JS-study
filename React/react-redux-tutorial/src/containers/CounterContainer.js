import React, { useCallback } from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease } from '../modules/counter';

// useSelector로 상태 조회하기
// const 결과 = useSelector(상태 선택 함수)
// 여기서 상태 선택 함수는 mapStateToProps와 형태가 동일.

// useDispatch를 사용하여 액션 디스패치하기
// useDispatch는 컴포넌트 내부에서 스토어의 내장함수 dispatch를 사용할 수 있게 해줌.
// 컨테이너 컴포넌트에서 액션을 디스패치해야할때 사용.
// const dispatch = useDispatch();
// dispatch({type:'SAMPLE_ACTION});
// useDispatch를 사용할때는 useCallback과 함께 사용하는것을 권장. (컴포넌트 성능 최적화 위해)

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

// 컴포넌트를 리덕스와 연동하기 위해서 connect 함수 사용
// connect(mapStateToProps, mapDispatchToProps)
// mapStateToProps : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
// mapDispatchToProps : 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
// connect 함수를 호출하면 또다른 함수를 반환. 반환된 함수에 컴포넌트를 파라미터로 넣어주면 리덕스와 연동된 컴포넌트가 만들어짐.

// mapStateToProps와 mapDispatchProps에서 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달됨.
// mapStateToProps : state를 파라미터로 받아오고, 이 값은 현재 스토어가 지니고 있는 상태를 가리킴.
// mapDispatchToProps : store의 내장 함수 dispatch를 파라미터로 받아옴.

//액션을 디스패치하기 위해 액션생성함수를 각각 호출하고 dispatch로 감싸는 작업 단순화
// 1. bindActionCreators 유틸함수 사용
// 2. 함수형태가 아닌 액션생성함수로 이루어진 객체형태를 사용하기
// ex) {increase, decrease}
export default CounterContainer;
