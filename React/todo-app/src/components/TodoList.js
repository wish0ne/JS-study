import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import './TodoList.scss';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onRemove, onToggle }) => {
  //react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할때 사용하는 함수
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );
  return (
    <List
      className="TodoList"
      width={512} //전체 크기
      height={513} //전체 높이
      rowCount={todos.length} //항목 개수
      rowHeight={57} //항목 높이
      rowRenderer={rowRenderer} //항목을 렌더링할때 쓰는 함수
      list={todos} //배열
      dstyle={{ outline: 'none' }} //List에 기본 적용되는 outline 스타일 제거
    />
  );
};

//리스트에 관련된 컴포넌트를 최적화할때는 리스트 내부에서 사용하는 컴포넌트도 최적화하고, 리스트로 사용되는 컴포넌트 자체도 최적해주는것이 좋음.
export default React.memo(TodoList);
