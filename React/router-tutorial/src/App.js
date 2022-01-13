import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Profile from "./Profile";
import Articles from "./Articles";
import Article from "./Article";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Login from "./Login";
import MyPage from "./MyPage";

//Route 컴포넌트로 특정 주소에 컴포넌트 연결
//Route 컴포넌트를 사용하여 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여줄지 정의할 수 있음.

//Link 컴포넌트 : 다른 주소로 이동시켜주는 컴포넌트.
//a 태그를 쓰면 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고있던 상태들을 모두 날려버림. 렌더링된 컴포넌트들도 모두 사라지고 다시 처음부터 렌더링하게 됨.
//Link 컴포넌트를 사용하여 페이지를 전환하면 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 HTML5 History API를 사용하여 페이지의 주소만 변경해줌.

const App = () => {
  return (
    <Routes>
      {/* 공통 레이아웃 컴포넌트 */}
      <Route path="/" element={<Layout />}>
        {/* index props는 path="/"와 동일한 의미. */}
        {/* index props는 상위 라우트의 경로와 일치하지만, 그 이후에 경로가 주어지지 않았을때 보여지는 라우트를 설정할때 사용. */}
        {/* path="/"와 동일한 역할을 하며 이를 좀 더 명시적으로 표현하는 방법. */}
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* URL 파라미터는 경로에 :를 사용하여 설정. 만약 URL 파라미터가 여러개라면 /profile:/username:/field와 같은 형태로 설정가능 */}
        <Route path="/profiles/:username" element={<Profile />} />
      </Route>
      {/* 중첩된 라우트 형태로 라우트 설정 */}
      {/* Articles 컴포넌트에서 Outlet 컴포넌트를 사용해줘야함. */}
      <Route path="/articles" element={<Articles />}>
        <Route path=":id" element={<Article />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="mypage" element={<MyPage />} />
      {/* *는 wildcard 문자로 아무 텍스트나 매칭한다는 뜻. 이 라우트 엘리먼트의 상단에 위치하는 라우트들의 규칙을 모두 확인하고, 일치하는 라우트가 없으면 이 라우트가 화면에 나타나게 됨. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
