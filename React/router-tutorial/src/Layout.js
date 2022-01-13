import { Outlet, useNavigate } from "react-router-dom";

//useNavigation : Link 컴포넌트를 사용하지 않고 다른 페이지로 이동해야하는 상황에 사용하는 Hook.

//페이지끼리 공통적으로 보여줘야 하는 레이아웃(ex)헤더)가 있을때도 중첩된 라우터+Outlet 유용하게 사용가능.
//컴포넌트를 한번만 사용해도 된다는 장점 존재.

const Layout = () => {
  const navigate = useNavigate();

  //이전 페이지로 이동
  const goBack = () => {
    //파라미터가 숫자 타입이라면 앞으로가거나 뒤로감.
    //-1은 한번 뒤로, -2는 두번 뒤로, 1은 한번 앞으로감(뒤로가기를 한번 한 상태여야함)
    navigate(-1);
  };

  //articles 경로로 이동
  const goArticles = () => {
    //replace 옵션 : 페이지를 이동할때 현재 페이지를 페이지 기록에 남기지 않음.
    navigate("/articles", { replace: true });
  };
  return (
    <div>
      <header style={{ background: "lightgray", padding: 16, fontSize: 24 }}>
        <button onClick={goBack}>뒤로가기</button>
        <button onClick={goArticles}>게시글 목록</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
