const clock = document.querySelector("h2#clock");

//setInterval(매번 실행할 함수, 실행간격) : 실행간격마다 매번 함수 실행
//setTimeout(함수, 시간) : 지정시간이 지나면 함수를 한번만 실행
function sayHello() {
  console.log("hi");
}
//setInterval(sayHello, 5000);
//setTimeout(sayHello, 5000);

//Date 객체
function getClock() {
  const date = new Date(); //호출 당시의 날짜, 시간 알 수 있음
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock(); //한번 미리 실행해야 1초동안 00:00:00을 표시하지 않게됨
setInterval(getClock, 1000); //1초마다 현재 시간 불러오는 시계(시작~1초뒤에 처음 실행)
