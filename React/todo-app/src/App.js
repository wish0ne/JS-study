import React, { useReducer, useRef, useCallback } from 'react';
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

//useReducer를 사용해도 함수가 계속 새로워지는 문제 해결할 수 있음.
//장점 : 상태를 업데이트 하는 로직을 모아서 컴포넌트 바깥에 둘 수 있음.
function todoReducer(todos, action) {
  //상태, 액션
  switch (action.type) {
    case 'INSERT': //새로 추가
      //{type:'INSERT', todo:{id:1, text:'todo', checked:false}}
      return todos.concat(action.todo);
    case 'REMOVE': //제거
      //{type:'REMOVE', id:1}
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': //토글
      //{tyle:'TOGGLE', id:1}
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

//일정 항목에 대한 상태들은 모두 App에서 관리 (부모 컴포넌트에서)
const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos); //컴포넌트가 맨 처음 렌더링될때만 createBulkTodos 함수 호출하기 위해 두번째 파라미터에 undefined를 넣음.

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
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  //id를 파라미터로 받아와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수
  //배열의 불변성을 지키면서 배열 원소 제거하기 위해 filter함수 사용
  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  //토글 기능 구현
  //불변성을 유지하면서 특정 배열 원소 업데이트하기 위해 map 사용

  const onToggle = useCallback((id) => {
    //id값이 같을때만 새로운 객체 생성, 다를때는 처음 받아왔던 상태 그대로 반환.
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
