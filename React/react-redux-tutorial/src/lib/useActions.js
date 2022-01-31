import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

//useActions : 액션 생성함수를 액션을 디스패치 하는 함수로 변환해줌.
// 액션 생성 함수를 사용하여 액션 객체를 만들고, 이를 스토어에 디스패치하는 작업을 해주는 함수를 자동으로 생성.

// actions : 액션 생성 함수로 이루어진 배열.
// deps : 배열. 이 배열안에 들어있는 원소가 바뀌면 액션을 디스패치 하는 함수를 새로 만듦.
export default function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : deps,
  );
}
