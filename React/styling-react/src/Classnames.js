//classnames 사용법

import classNames from "classnames";

//여러 종류의 파라미터를 조합해 CSS 클래스를 적용할 수 있으므로 컴포넌트에서 조건부로 클래스를 설정할때 편리.
classNames("one", "two"); // = 'one two'
classNames("one", { two: true }); // = 'one two'
classNames("one", { two: false }); //= 'one'
classNames("one", ["two", "three"]); // = 'one two three'

const myClass = "hello";
classNames("one", myClass, { myCondition: true }); // = 'one hellow myCondition'

//props값에 따라 다른 스타일을 주기가 쉬워짐.
const MyComponent = ({ highlighted, theme }) => (
  <div className={classNames("MyComponent", { highlighted }, theme)}>Hello</div>
);
//highlighted값이 true이면 highlighted 클래스가 적용되고, false이면 적용되지 않음.
//theme으로 전달받는 문자열은 내용 그대로 클래스에 적용됨.

//classnames 쓰지 않는다면?
const MyComponent2 = ({ highlighted, theme }) => (
  <div className={`MyComponent ${theme} ${highlighted ? "highlighted" : ""}`}>
    Hello
  </div>
);
