import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

//lag을 경험해보게 많은 데이터 렌더링하는 함수
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할일 ${i}`,
      checked: false,
    });
  }
  return array;
}

//일정 항목에 대한 상태들은 모두 App에서 관리 (부모 컴포넌트에서)
const App = () => {
  //파라미터로 createBulkTodos()라고 넣어주면 리렌더링할때마다 함수가 호출되지만, 아래처럼 넣어주면 컴포넌트가 처음 리렌더링될때만 함수가 실행됨.
  const [todos, setTodos] = useState(createBulkTodos);

  //고유값으로 사용될 id. ref를 사용하여 변수담기
  //id값은 렌더링되는 정보가 아니므로 useRef를 사용하여 변수 생성
  const nextId = useRef(2501);

  //todos 배열에 새 항목 추가 함수
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  //id를 파라미터로 받아와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수
  //배열의 불변성을 지키면서 배열 원소 제거하기 위해 filter함수 사용
  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id)); //함수형 업데이트 통해 배열에 todos 안넣어도됨 -> todos 바뀔때마다 onRemove 함수 안바껴도 됨.
  }, []);

  //토글 기능 구현
  //불변성을 유지하면서 특정 배열 원소 업데이트하기 위해 map 사용

  const onToggle = useCallback((id) => {
    //id값이 같을때만 새로운 객체 생성, 다를때는 처음 받아왔던 상태 그대로 반환.
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
