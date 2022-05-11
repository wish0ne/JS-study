//3.0 The Document Object
//HTML의 element들을 javascript를 통해 변경하고 읽을 수 있다.
//Javascript는 이미 HTML에 연결되어 있음. document 객체로 접근가능
//document : 웹사이트를 가리킴 (HTML을 가리키는 객체)
console.log(document.title);
console.log(document.body);

//3.1 HTML in Javascript
//id로 접근
console.log(document.getElementById("title"));
console.dir(document.getElementById("title")); //console.dir로 객체의 property를 빠르게 확인할 수 있음
const title = document.getElementById("title");
title.innerText = "Got you!";

//3.2 Searching For Elements
//HTML의 element들을 가져오는 방법
const hellos = document.getElementsByClassName("hello"); //같은 class이름을 가지는 element들을 한번에 가져옴. 배열 반환
console.log(hellos);
const hello = document.getElementsByTagName("h3"); //태그이름으로 모두 가져옴. 배열 반환
console.log(hello);

//✔ querySelector : css방식으로 element 검색. 첫번째 element 하나만 반환
const hi = document.querySelector(".hello h3");
console.log(hi);
//✔ querySelectorAll : 조건에 부합하는 모든 element 배열 반환
const his = document.querySelectorAll(".hello");
console.log(his);

//3.3 Events
//javascript는 event를 listen할 수 있다
function handleTitleClick() {
  title.style.color = "blue";
}

function handleMouseEnter() {
  title.innerText = "Mouse is here!";
}

function handleMouseLeave() {
  title.innerText = "Mouse is gone!";
}

//element에 event listener 추가 (이벤트 타입, 콜백함수)
//console.dir(element)해서 on-으로 시작하는 property들이 모두 이벤트
title.addEventListener("click", handleTitleClick); //handleTitleClick()이라고 적으면 안됨(바로 실행시키면 안됨)
title.addEventListener("mouseenter", handleMouseEnter);
title.addEventListener("mouseleave", handleMouseLeave);

//event를 사용하는 2가지 방법
//1. title.addEventListener('click', 콜백함수)
//2. title.onClick(콜백함수)
//1번을 선호하는 이유 : removeEventListener를 통해서 이벤트 리스터 제거가능

//window 인터페이스 : DOM 문서를 담은 창을 의미
//현재 스크립트가 작동중인 창을 나타냄
//window 객체에도 event 할당가능

function handleWindowResize() {
  //기본태그들(title, body)만 document에서 바로 호출가능
  //div, h1등은 querySelector로 접근해야함
  document.body.style.backgroundColor = "tomato";
}
function handleWindowCopy() {
  alert("copier!");
}
function handleWindowOffline() {
  alert("SOS no WIFI");
}
function handleWindowOnline() {
  alert("ALL GOOOD");
}
window.addEventListener("resize", handleWindowResize);
window.addEventListener("copy", handleWindowCopy);
window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online", handleWindowOnline);
