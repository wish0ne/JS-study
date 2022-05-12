const loginForm = document.querySelector(".login-form");
//document 객체가 아니라 loginForm에서도 input과 button을 찾을 수 있음
const loginInput = document.querySelector(".login-form input");
const loginButton = loginForm.querySelector("button");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginBtnClick() {
  //console.log(loginInput);
  const username = loginInput.value;
  //html 태그의 속성들로도 충분히 구현가능하다! 최대한 활용하자
  //   if (username === "") {
  //     alert("Please write your name");
  //   } else if (username.length > 15) {
  //     alert("Your name is too long");
  //   }
}

//<form>은 submit 기능을 가지고 있으므로 click 이벤트 추가 안해줘도 됨 (submit 이벤트 사용)
//loginButton.addEventListener("click", onLoginBtnClick);
//엔터키나 form안의 button 누르면 발생
function onLoginSubmit(e) {
  //submit 시 새로고침 막기(브라우저 기본동작 막음)
  e.preventDefault();
  const username = loginInput.value;
  console.log(username);
  loginForm.classList.add(HIDDEN_CLASSNAME);
  //localStorage로 브라우저에 값 저장
  localStorage.setItem(USERNAME_KEY, username); //key, value로 저장

  //✔onSubmit에서 paintGreeting을 해주지 않으면 submit시 바로 업데이트가 안됨
  //1. localStorage를 확인해서 값이 없으면 form을 보여줌
  //2. submit 발생 시 form을 없애줌
  //~> 따라서 localStorage 확인이 먼저니까 onSubmit에서도 paintGreeting을 해줘야함
  paintGreetings(username);
}
loginForm.addEventListener("submit", onLoginSubmit);

const savedUserName = localStorage.getItem(USERNAME_KEY);

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

if (savedUserName === null) {
  //show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  //show the greetings
  paintGreetings(savedUserName);
}
