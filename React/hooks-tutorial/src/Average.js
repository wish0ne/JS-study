import React, { useState, useMemo } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중...");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number)); //concat : 파라미터값을 기존 배열에 합쳐서 새로운 배열 생성
    setList(nextList);
    setNumber("");
  };

  //list배열의 내용이 바뀔때만  getAverage 함수가 호출됨.
  //useMemo : 렌더링하는 과정에서 특정 값이 바뀌었을때만 연산 실행, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용
  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
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
