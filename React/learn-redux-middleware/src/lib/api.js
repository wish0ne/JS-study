import axios from "axios";

//API를 모두 함수화
//각 API를 호출하는 함수를 따로 작성하면 나주에 사용할때 가독성도 좋고 유지보수도 쉬워짐.
export const getPost = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/users`);
