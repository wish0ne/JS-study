import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState(''); //입력 input

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  //onClick 대신 onSubmit 이벤트 사용한 이유 : onSubmit 이벤트는 인풋에서 엔터를 눌렀을때도 발생.
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');

      //submit 이벤트는 브라우저에서 새로고침을 발생시킴.
      //이를 방지하기 위한 함수 호출
      e.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
