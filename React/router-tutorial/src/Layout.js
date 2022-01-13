import { Outlet } from "react-router-dom";

//페이지끼리 공통적으로 보여줘야 하는 레이아웃(ex)헤더)가 있을때도 중첩된 라우터+Outlet 유용하게 사용가능.
//컴포넌트를 한번만 사용해도 된다는 장점 존재.

const Layout = () => {
  return (
    <div>
      <header style={{ background: "lightgray", padding: 16, fontSize: 24 }}>
        Header
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
