import React, { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중...");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null); //useRef를 통해 만든 객체

  //useCallback 사용 x -> 컴포넌트가 리렌더링될때마다 새로 만들어진 함수 사용.
  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); //컴포넌트가 처음 렌더링될때만 함수 생성

  const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(parseInt(number)); //concat : 파라미터값을 기존 배열에 합쳐서 새로운 배열 생성
      setList(nextList);
      setNumber("");
      inputEl.current.focus(); //useRef를 통해 만든 객체안의 current값이 실제 엘리먼트를 가리킴.
    },
    [number, list]
  ); //number 나 list가 바뀌었을때만 함수 생성
  //함수 내부에서 상태값에 의존해야 할때는 그 값을 반드시 배열안에 포함시켜야함.

  //list배열의 내용이 바뀔때만  getAverage 함수가 호출됨.
  //useMemo : 렌더링하는 과정에서 특정 값이 바뀌었을때만 연산 실행, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용
  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b>
        {avg}
      </div>
    </div>
  );
};

export default Average;

//컴포넌트 로컬 변수를 사용해야 할때도 useRef 활용 가능.
//ref안의 값이 바뀌어도 컴포넌트가 리렌더링 되지 않음. 렌더링과 관련되지 않은 값을 관리할때만 사용해야함.
const RefSample = () => {
  const id = useRef(1); //로컬 변수. 값 수정이나 조회시 .current 사용
  const setId = (n) => {
    id.current = n;
  };
  const printId = () => {
    console.log(id.current);
  };
  return <div>refsample</div>;
};

//useRef 사용하지 않고
//const id = {current:1};
//처럼 사용하게 되면 함수형 컴포넌트는 리렌더링될때마다 함수 내부에 정의된 로컬변수들을 초기화함.
//따라서 id.curretn는 리렌더링될때마다 1.
//하지만 useRef로 만들어진 객체는 React가 만든 전역 저장소에 저장되기 때문에 함수를 재호출하더라도 마지막으로 업데이트한 current값이 유지됨.
