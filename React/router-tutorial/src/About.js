import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

//페이지 주소에 유동적인 값을 전달해야할때 1. 파라미터 2. 쿼리
//일반적으로 쿼리는 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용

const About = () => {
  //useLocation : location 객체를 반환하며 이 객체는 현재 사용자가 보고있는 페이지의 정보를 지니고 있음.

  //location 객체의 값들
  // pathname: 현재 주소의 경로 (쿼리스트링 제외)
  // search: 맨 앞의 ? 문자 포함한 쿼리스트링 값
  // hash: 주소의 # 문자열 뒤의 값 (주로 History API 가 지원되지 않는 구형 브라우저에서 클라이언트 라우팅을 사용할 때 쓰는 해시 라우터에서 사용합니다.)
  // state: 페이지로 이동할때 임의로 넣을 수 있는 상태 값
  // key: location 객체의 고유 값, 초기에는 default 이며 페이지가 변경될때마다 고유의 값이 생성됨

  //location.search값을 통해 얻은 쿼리스트링값을 파싱해야하는데, v6부터는 useSearchParams 훅 통해 쉽게 가능.

  //   const location = useLocation();

  //useSearchParams는 배열 타입의 값 반환.
  //첫번째 원소는 쿼리 파라미터를 조회하거나 수정하는 메서드들이 담긴 객체를 반환. get 메서드를 통해 특정 쿼리파라미터를 조회할 수 있고, set 메서드를 통해 특정 쿼리파라미터를 업데이트 가능. 만약 조회시 쿼리파라미터가 존재하지 않는다면 null로 조회됨.
  //두번째 원소는 쿼리파라미터를 객체형태로 업데이트할 수 있는 함수 반환.
  const [searchParams, setSearchParams] = useSearchParams();
  //http://localhost:3000/about?detail=true&mode=1
  const detail = searchParams.get("detail");
  const mode = searchParams.get("mode");

  const onToggleDetail = () => {
    //쿼리파라미터 사용할때 주의점 : 쿼리파라미터를 조회할때 값은 무조건 문자열 타입이여야함.
    //불린값을 넣게된다면 따옴표로 감싸서 비교
    //숫자를 다루게 된다면 parseInt를 사용하여 숫자타입으로 변환해야함.
    setSearchParams({ mode, detail: detail === "true" ? false : true });
  };

  const onIncreaseMode = () => {
    const nextMode = mode === null ? 1 : parseInt(mode) + 1;
    setSearchParams({ mode: nextMode, detail });
  };

  //http://localhost:3000/about?detail=true&mode=1
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
      {/* 쿼리스트링은 location.search값 통해 조회가능. */}
      {/* <p>쿼리스트링:{location.search}</p> */}
      <p>detail:{detail}</p>
      <p>mode:{mode}</p>
      <button onClick={onToggleDetail}>Toggle detail</button>
      <button onClick={onIncreaseMode}>mode+1</button>
    </div>
  );
};

export default About;
