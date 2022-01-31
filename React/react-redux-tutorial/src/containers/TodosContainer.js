import React, { useCallback } from 'react';
import Todos from '../components/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, toggle, remove, insert } from '../modules/todos';
import useActions from '../lib/useActions';

// connect 대신 useSelector와 useDispatch Hook 사용하기
const TodosContainer = () => {
  //비구조화 할당 문법 사용
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const dispatch = useDispatch();
  //액션의 종류가 많을때, 어떤 값이 액션생성함수의 파라미터로 사용되어야 하는지 일일이 명시해주는것이 번거로움.
  // => useActions 유틸 Hooks 만들어서 사용하기 (여러개의 액션을 사용해야 하는 경우 코드 깔끔하게 정리하여 작성 가능.)
  // const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
  //   [changeInput, insert, toggle, remove],
  //   [],
  // );
  const onChangeInput = useCallback(
    (input) => dispatch(changeInput(input)),
    [dispatch],
  );
  const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

//성능 최적화 위해 useSelector 사용할시에는 React.memo 사용해줘야함.
//현재의 경우 TodosContainer의 부모 컴포넌트인 App이 리렌더링되는 경우가 없으므로 불필요
export default React.memo(TodosContainer);
