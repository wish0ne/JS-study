const customName = document.getElementById('customname'); //텍스트 필드값 저장
const randomize = document.querySelector('.randomize'); // button object 저장
const story = document.querySelector('.story'); //<p> element 저장

function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random]; //배열 항목 중 하나 랜덤 반환
}

// var : 변수 재선언 가능
// let : 변수 재선언 불가능, 변수 재할당 가능
// const: 변수 재선언 불가능, 변수 재할당 불가능
//var은 편리하지만 변수남용문제를 일으킬 수 있으니 다음부터는 let,const를 써보자
var storyText="It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

var insertX=['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
var insertY=['the soup kitchen', 'Disneyland', 'the White House'];
var insertZ=['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

randomize.addEventListener('click', result); //click되었을때 result함수 실행

function result() {

  var newStory=storyText; //함수 실행될때마다 변경됨

  var XItem=randomValueFromArray(insertX);
  var YItem=randomValueFromArray(insertY);
  var ZItem=randomValueFromArray(insertZ);

  //문자열 변경
  newStory=newStory.replace(/:insertx:/gi,XItem);
  newStory=newStory.replace(':inserty:', YItem);
  newStory=newStory.replace(':insertz:',ZItem);


  //텍스트를 입력했으면 Bob을 입력값으로 변경
  if(customName.value !== '') {
    let name = customName.value;
    newStory=newStory.replace('Bob', name);
  }

  //uk가 선택되면 단위 교체
  if(document.getElementById("uk").checked) {
    let weight = Math.round(300/14).toString() +' stone';
    let temperature = Math.round((94-32)*5/9).toString()+' centigrade';
    
    newStory=newStory.replace('94 fahrenheit', temperature);
    newStory=newStory.replace('300 pounds', weight);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

//변수 name, weight, temperature에는 const, 나머지는 let을 쓰는것이 좋다.