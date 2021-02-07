const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
for(var i=1; i<6; i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic'+i+'.jpg');
    thumbBar.appendChild(newImage);

    const imageAttribute=newImage.getAttribute('src');

    var changeImage=function(){
        displayedImage.setAttribute('src', imageAttribute);
    }

    newImage.addEventListener('click', changeImage);

    /*Example
    newImage.onclick=function(e){
        displayedImage.src=e.target.src;
        (event.tagert: event bubbling의 최하위 요소 반환. 즉 클릭된 요소를 기준으로 사용)
    }
    */
}

/* Wiring up the Darken/Lighten button */

var changeColor=function(){
    var btnAttribute=btn.getAttribute('class');
    if(btnAttribute==='dark'){
        btn.setAttribute('class','light');
        btn.textContent='Lighten';
        overlay.style.backgroundColor='rgba(0,0,0,0.5)';
    }else{
        btn.setAttribute('class', 'dark');
        btn.textContent='Darken';
        overlay.style.backgroundColor='rgba(0,0,0,0)';
    }
}

btn.addEventListener('click', changeColor);

/* Example
btn.onclick=function(){
    const btnClass= btn.getAttribute('class');
    if(btnAttribute==='dark'){
        btn.setAttribute('class','light');
        btn.textContent='Lighten';
        overlay.style.backgroundColor='rgba(0,0,0,0.5)';
    }else{
        btn.setAttribute('class', 'dark');
        btn.textContent='Darken';
        overlay.style.backgroundColor='rgba(0,0,0,0)';
    }
}
*/
