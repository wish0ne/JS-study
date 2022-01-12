import React, { useRef, useCallback, useState } from "react";
import produce from "immer";

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  //input 수정을 위한 함수
  const onChange = useCallback(
    (e) => {
      // console.log(e.target.name);
      // console.log(e.target.value);
      const { name, value } = e.target; //e.target.name, e.target.value
      setForm(
        produce((draft) => {
          draft[name] = value;
        })
      );
    },
    [] //함수형 업데이트 사용해서 배열에 forms 안넣어도 됨.
  );

  //form 등록을 위한 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };
      //array에 새 항목 등록
      setData(
        produce((draft) => {
          draft.array.push(info);
        })
      );

      //form초기화
      setForm({
        name: "",
        username: "",
      });

      nextId.current += 1;
    },
    [form.name, form.username]
  );

  //항목 삭제
  //onRemove의 경우 filter을 사용하는것이 코드가 더 깔끔하므로, 굳이 immer를 적용할 필요 없음.
  //immer는 불변성 유지하는 코드가 복잡할때만 사용해도 충분.
  const onRemove = useCallback((id) => {
    setData(
      produce((draft) => {
        draft.array.splice(
          draft.array.findIndex((info) => info.id === id),
          1
        );
      })
    );
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="아이디" onChange={onChange} />
        <input name="name" placeholder="이름" onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username}({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
