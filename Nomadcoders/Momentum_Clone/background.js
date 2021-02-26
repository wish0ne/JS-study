const body=document.querySelector('body');
const IMG_NUMBER=3;


function paintImage(imgNumber){
    const image=new Image();
    image.src=`images/image${imgNumber+1}.jpg`;
    image.classList.add('bgImage');
    body.appendChild(image);
    image.addEventListener('load', function(){
        image.classList.add('showing'); 
    });

};

function getRandom(){
    const number=Math.floor(Math.random()*IMG_NUMBER);
    return number;

};

function init(){
    const randomNumber=getRandom();
    paintImage(randomNumber);
};

init();
