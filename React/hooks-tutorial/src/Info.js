import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value, //e.target.name : e.target.value
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, { name: "", nickname: "" });
  const { name, nickname } = state;

  //useReducer에서 action은 어떤값도 사용가능. 여기서는 이벤트 객체가 지니고 있는 e.target값 자체를 액션값으로 사용
  //이런식으로 인풋을 관리하면 인풋의 개수가 많아져도 코드를 짧고 깔끔하게 유지가능!
  const onChange = (e) => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
