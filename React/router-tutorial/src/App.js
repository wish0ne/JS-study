import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Profile from "./Profile";

//Route 컴포넌트로 특정 주소에 컴포넌트 연결
//Route 컴포넌트를 사용하여 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여줄지 정의할 수 있음.

//Link 컴포넌트 : 다른 주소로 이동시켜주는 컴포넌트.
//a 태그를 쓰면 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고있던 상태들을 모두 날려버림. 렌더링된 컴포넌트들도 모두 사라지고 다시 처음부터 렌더링하게 됨.
//Link 컴포넌트를 사용하여 페이지를 전환하면 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 HTML5 History API를 사용하여 페이지의 주소만 변경해줌.

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong의 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/velopert">velopert의 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/void">존재하지 않는 프로필</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* URL 파라미터는 경로에 :를 사용하여 설정. 만약 URL 파라미터가 여러개라면 /profile:/username:/field와 같은 형태로 설정가능 */}
        <Route path="/profiles/:username" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
