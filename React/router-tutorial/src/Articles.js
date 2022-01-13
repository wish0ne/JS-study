import { Link, Outlet, NavLink } from "react-router-dom";
//Outlet 컴포넌트 : Route의 child로 들어가는 JSX 엘리먼트를 보여주는 역할.
//현재는 <Route path=":id" element={<Article />} />이 보여짐.

//NavLink : 링크에서 사용하는 경로가 현재 라우트의 경로와 일치하는 경우 특정 스타일 또는 CSS 클래스를 적용하는 컴포넌트.

const Articles = () => {
  //   const activeStyle = {
  //     color: "green",
  //     fontSize: 21,
  //   };
  return (
    <div>
      <Outlet />
      <ul>
        <ArticleItem id={1} />
        <ArticleItem id={2} />
        <ArticleItem id={3} />
        {/* <li>
          <NavLink
            to="/articles/1"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            게시글 1
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/articles/2"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            게시글 2
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/articles/3"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            게시글 3
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
};

//반복되는 코드가 사용되므로 NavLink를 감싼 또다른 컴포넌트를 만들어서 사용하는것을 권장.
const ArticleItem = ({ id }) => {
  const activeStyle = {
    color: "green",
    fontSize: 21,
  };

  return (
    <li>
      <NavLink
        to={`/articles/${id}`}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        게시글 {id}
      </NavLink>
    </li>
  );
};

export default Articles;
