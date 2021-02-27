const canvas=document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const save=document.getElementById("jsSave");
const INITIAL_COLOR="#2c2c2c";
const CANVAS_SIZE=canvas.offsetWidth;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;

let painting=false;
let filling=false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    //offset : 캔버스 내에서의 위치 vs client : 창 내에서의 위치
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColor(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRange(event){
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleMode(){
    if(filling){
        filling=false;
        mode.innerText="Fill";
    }
    else{
        filling=true;
        mode.innerText="Paint";
    }
};

function handleCanvas(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
};

function handleCM(event){
    event.preventDefault();
}

function handleSave(event){
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    link.download="🎨";
    link.click();


}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvas);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color=>color.addEventListener("click", handleColor));

if(range){
    range.addEventListener("input", handleRange);
}

if(mode){
    mode.addEventListener('click', handleMode);
}

if(save){
    save.addEventListener('click', handleSave);
}