//페이지 주소에 유동적인 값을 전달해야할때 1. 파라미터 2. 쿼리
//일반적으로 파라미터는 특정 아이디 혹은 이름을 사용하여 조회할때 사용

import React from "react";
import { useParams } from "react-router-dom";

const data = {
  velopert: {
    name: "김민준",
    description: "리액트를 좋아하는 개발자",
  },
  gildong: {
    name: "홍길동",
    description: "고전 소설 홍길동전의 주인공",
  },
};

const Profile = () => {
  //URL 파라미터는 useParams 훅을 사용하여 객체형태로 조회가능.
  //URL 파라미터의 이름은 라우터 설정 시 Route 컴포넌트의 path props를 통하여 설정.
  const params = useParams();
  const profile = data[params.username];

  //username URL 파라미터를 통해 프로필을 조회한 뒤, 프로필이 존재/미존재 여부에 따라 로직 설정
  return (
    <div>
      <h1>사용자 프로필</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다.</p>
      )}
    </div>
  );
};

export default Profile;
