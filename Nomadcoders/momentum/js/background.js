const images = ["공원.jpeg", "무지개.jpg", "바다.jpg", "파도.png", "풍경.jpeg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

//createElement : 지정한 태그의 HTML 요소를 만들어 반환
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;

//appendChild : 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙임
document.body.appendChild(bgImage);
//document.body.prepend(bgImage);
