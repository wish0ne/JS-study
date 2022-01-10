import React from "react";
import styled, { css } from "styled-components";

// styled-components의 장점 : props값으로 전달해주는 값을 쉽게 스타일에 적용할 수 있음.
//vscode-styled-components 설치하면 코드 신택스 하이라이팅 적용할 수 있음.

//스타일 작성시 `를 사용하여 만든 문자열에 스타일 정보를 넣음 => Tagged 템플릿 리터럴
// tagged 템플릿 리터럴은 템플릿안에 자바스크립트 객체나 함수를 전달할때 온전히 추출할 수 있음.
// styled-components에서는 이러한 속성을 사용하여 styled-components로 만든 컴포넌트의 props를 스타일 쪽에서 쉽게 조회할 수 있도록 해줌.

//반응형 디자인 시 styled-components 매뉴얼에서 제공하는 유틸함수를 사용하여 작업을 함수화하여 간편하게 사용할 수 있음.
//모듈화한뒤 불러와서 사용하면 편리.
const sizes = {
  desktop: 1024,
  tablet: 768,
};

//위에 있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어줌.
//styled-components 메뉴얼 참고
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

//'styled.태그명'을 사용하여 스타일링된 엘리먼트 구현
const Box = styled.div`
  //props로 넣어준 값을 직접 전달해줄 수 있음.
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;

  //   반응형 디자인
  // 기본적으로는 가로크기 1024px에 가운데 정렬, 가로 크기가 작아짐에 따라 크기를 줄이고 768px 미만이 되면 꽉 채움
  width: 1024px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  //  반응형 디자인 함수화
  // ${media.desktop`width:768px;`}
  // ${media.tablet`width:100%;`}
`;
//styled.div뒤에 tagged 템플릿 리터럴 문법을 통해 스타일을 넣어주면, 해당 스타일이 적용된 div로 이루어진 리액트 컴포넌트가 생성됨.

//props에 따른 조건부 스타일링
const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  //   &문자 사용하여 Sass처럼 자기 자신 선택 가능
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  //   inverted값이 true일때 특정 스타일을 부여해줌.
  //   스타일코드 여러줄을 props에 따라 넣어주어야할때는 CSS를 styled-components에서 불러와서 감싸줘야함.
  ${(props) =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;

//사용해야 할 태그명이 유동적이거나, 특정 컴포넌트 자체에 스타일링 해주고 싶은 경우
// const MyInput = styled('input')`
//   background:gray;
// `
//아예 컴포넌트 형식의 값을 넣어줌
// const StyledLink = styled(Link)`
//     color:blue;
// `

const StyledComponent = () => (
  // props로 color값을 넣어줌.
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;
