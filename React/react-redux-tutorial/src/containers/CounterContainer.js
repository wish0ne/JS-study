import React from 'react';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
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

const mapStateToProps = (state) => ({
  number: state.counter.number,
});

const mapDispatchToProps = (dispatch) => ({
  // 액션 생성 함수를 불러와 액션 객체를 만들고 디스패치해줌
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});
//액션을 디스패치하기 위해 액션생성함수를 각각 호출하고 dispatch로 감싸는 작업 단순화
// 1. bindActionCreators 유틸함수 사용
// 2. 함수형태가 아닌 액션생성함수로 이루어진 객체형태를 사용하기
// ex) {increase, decrease}
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
