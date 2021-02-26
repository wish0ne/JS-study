const toDoform=document.querySelector('.js-toDoForm');
const toDoInput=toDoform.querySelector('input'),
    toDoList=document.querySelector('.js-toDoList');

const TODOS_LS='toDos';

let toDos=[];

function deleteToDo(event){
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id !==parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDos();
    //filter : array의 모든 아이템을 통해 함수를 실행하고 true인 아이템들만 가지고 새로운 array를 만듦.
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON.stringify: 객체를 string으로 변경. localStorage에는 string만 저장가능
}

function loadToDo(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if (loadedToDos!==null){
        const parsedToDos=JSON.parse(loadedToDos); //JSON을 이용해 string을 객체로 변환
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }) // for each : 배열에 담겨있는 각각에 한번씩 함수를 실행시켜줌
    }
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";

}

function paintToDo(text){
    const li=document.createElement('li');
    const delBtn=document.createElement('btn');
    delBtn.innerText="❌";
    delBtn.addEventListener('click', deleteToDo);
    const span = document.createElement('span');
    const newId=toDos.length+1;
    span.innerText=text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id=newId;
    toDoList.appendChild(li);
    const toDoObj={
        text:text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function init(){
    loadToDo();
    toDoform.addEventListener('submit', handleSubmit)
}

init();