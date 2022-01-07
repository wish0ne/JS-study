import React, { Component } from 'react';

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null; //ref를 설정할 부분

  //컴포넌트의 생성자 메서드. 컴포넌트를 만들때 처음으로 실행됨. 초기 state를 정할 수 있음.
  constructor(props) {
    super(props);
    console.log('constructor');
  }

  //props로 받아온 값을 state에 동기화 시키는 용도로 사용. 컴포넌트가 마운트될때와 업데이트될때 호출.
  //부모에게서 받은 color값(props)을 state에 동기화함.
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  //컴포넌트를 만들고, 첫 렌더링을 다 마친후 실행
  componentDidMount() {
    console.log('componentDidMount');
  }

  //props 또는 state를 변경했을때 리렌더링을 시작할지 여부를 지정하는 메서드
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    //숫자의 마지막 자리가 4면 리렌더링 하지 않음.
    return nextState.number % 10 !== 4;
  }

  //컴포넌트를 DOM에서 제거할때 실행
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  //render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출.
  //DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 반환하여 이것을 componentDidUpdate에서 조회할 수 있게 함.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  //리렌더링을 완료한 후 실행.
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState);
    if (snapshot) {
      console.log('업데이트되기 직전 색상: ', snapshot);
    }
  }

  //라이프사이클 메서드 중 필수. 컴포넌트 모양새를 정의. 리액트 요소를 반환
  render() {
    console.log('render');

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        {this.props.missing.value}
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
