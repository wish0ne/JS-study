import React, { useState, useEffect } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  //컴포넌트가 언마운트되기전 & 업데이트 되기 직전에 작업 수행 -> cleanup 함수 반환
  useEffect(() => {
    console.log("effect");
    console.log(name);
    return () => {
      console.log("cleanup");
      console.log(name);
    };
  }, [name]); //오직 언마운트될때만 cleanup함수 호출하고 싶다면 빈배열

  //렌더링될때마다 실행
  // useEffect(() => {
  //   console.log("렌더링이 완료되었습니다!");
  //   console.log({
  //     name,
  //     nickname,
  //   });
  // });

  //마운트될때만 실행
  // useEffect(()=>{
  //   console.log('마운트될때만 실행됩니다.')
  // },[])

  //특정 값이 업데이트될때만 실행
  // useEffect(()=>{
  //   console.log(name)
  // },[name])

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
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
