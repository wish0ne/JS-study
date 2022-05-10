//3.1 The Document Object
//HTML의 element들을 javascript를 통해 변경하고 읽을 수 있다.
//Javascript는 이미 HTML에 연결되어 있음. document 객체로 접근가능
//document : 웹사이트를 가리킴 (HTML을 가리키는 객체)
console.log(document.title);
console.log(document.body);

//3.2 HTML in Javascript
//id로 접근
console.log(document.getElementById("title"));
console.dir(document.getElementById("title")); //console.dir로 객체의 property를 빠르게 확인할 수 있음
const title = document.getElementById("title");
title.innerText = "Got you!";

//3.3 Searching For Elements
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
