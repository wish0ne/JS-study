import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    //axios.get() : 파라미터로 전달된 주소에 GET 요청 해줌. 이에 대한 결과는 .then을 통해 비동기적으로 확인 가능.
    // axios
    //   .get('https://jsonplaceholder.typicode.com/todos/1')
    //   .then((response) => {
    //     setData(response.data);
    //   });

    //async 적용
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          // stringify(JSON문자열로 변환할 값, null이면 객체의 모든 속성이 JSON 문자열 결과에 저장, 공백으로 사용되는 스페이스의 수) : js값이나 객체를 JSON 문자열로 변환
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </div>
  );
};

export default App;
