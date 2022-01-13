import { Navigate } from "react-router-dom";
//Navigate 컴포넌트 : 컴포넌트를 화면에 보여주는 순간 다른 페이지로 이동하고 싶을때 사용하는 컴포넌트. 즉 페이지를 리다이렉트 하고싶을 때 사용
//ex) 사용자의 로그인이 필요한 페이지인데 로그인 안한 경우 로그인 페이지를 보여줘야함.

const MyPage = () => {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return <div>마이 페이지</div>;
};

export default MyPage;
