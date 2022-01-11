import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

//일정 항목에 대한 상태들은 모두 App에서 관리 (부모 컴포넌트에서)
const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  //고유값으로 사용될 id. ref를 사용하여 변수담기
  //id값은 렌더링되는 정보가 아니므로 useRef를 사용하여 변수 생성
  const nextId = useRef(4);

  //todos 배열에 새 항목 추가 함수
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  //id를 파라미터로 받아와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수
  //배열의 불변성을 지키면서 배열 원소 제거하기 위해 filter함수 사용
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  //토글 기능 구현
  //불변성을 유지하면서 특정 배열 원소 업데이트하기 위해 map 사용

  const onToggle = useCallback(
    (id) => {
      //id값이 같을때만 새로운 객체 생성, 다를때는 처음 받아왔던 상태 그대로 반환.
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
