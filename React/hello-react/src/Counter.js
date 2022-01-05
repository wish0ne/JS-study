import React, { Component } from 'react';

class Counter extends Component {
  //   constructor(props) {
  //     //state 설정 시 constructor 메서드 작성하여 설정.
  //     super(props); //클래스형 컴포넌트에서 constructor 작성시 반드시 호출. 호출 시 현재 클래스형 컴포넌트가 상속받고 있는 Component 클래스가 지닌 생성자 함수 호출해줌.
  //     //state의 초기값 설정.
  //     this.state = {
  //       number: 0,
  //       fixedNumber: 0,
  //     };
  //   }
  state = {
    number: 0,
    fixedNumber: 0,
  };

  render() {
    const { number, fixedNumber } = this.state; //state 조회할때는 this.state로 조회.
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값: {fixedNumber}</h2>
        <button
          //onClick을 통해 버튼이 클릭되었을때 호출할 함수를 지정.
          onClick={() => {
            //this.setState를 사용하여 state에 새로운 값 넣을 수 있음.
            this.setState({ number: number + 1 }, () => {
              console.log('방금 setState가 호출되었습니다.');
              console.log(this.state);
            });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
