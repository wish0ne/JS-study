// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//CanvasElement.getContext('2d'): 2차원 렌더링 context를 나타내는 객체 생성
//ctx : 캔버스의 drawing area를 표현하는 객체, 2d 모양을 그릴 수 있게 함

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
//캔버스의 너비/높이 = 브라우저 뷰포트의 너비/높이

// function to generate random number
function random(min, max) { //최소 min, 최대 max의 난수 발생
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//constructor
function Ball(x, y, velX, velY, color, size){
    this.x=x;
    this.y=y; //공이 시작되는 화면상의 수평, 수직좌표. 0(왼쪽 위 모서리)부터 브라우저 뷰포트의 너비/높이(오른쪽 아래 모서리)까지
    this.velX=velX;
    this.velY=velY; //공의 수직, 수평속도. x,y좌표에 값만큼 추가되면서 그 값만큼 공이 움직이게 됨
    this.color=color; //공의 색갈
    this.size=size; //공 크기. px로 반지름
}

//method
Ball.prototype.draw=function(){
    ctx.beginPath(); //새로운 경로 생성
    ctx.fillStyle=this.color; 
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI); //중심x좌표, 중심y좌표, 반지름, 0도~360도(라디안 단위)
    ctx.fill(); //경로의 내부를 채움
}

Ball.prototype.update=function(){ //ball이 모서리에 도달하는지 체크. 도달하면 공을 반대방향으로 이동시키기 위해 속도의 방향을 반대로만듦.
    if((this.x+this.size)>=width){ //오른쪽 모서리
        this.velX=-(this.velX);
    }

    if((this.x-this.size)<=0){ //왼쪽 모서리
        this.velX=-(this.velX);
    }

    if((this.y+this.size)>=height){ //아래 모서리
        this.velY=-(this.velY);
    }

    if((this.y-this.size)<=0){ //위 모서리
        this.velY=-(this.velY);
    }

    this.x+=this.velX;
    this.y+=this.velY;
}

//collision detection
Ball.prototype.collisionDetect=function(){
    for(let j=0; j<balls.length; j++){
        if(!(this===balls[j])){ //두 원이 어떤 영역도 겹치지 않는지 확인(2d 충돌 감지 참고)
            const dx=this.x-balls[j].x;
            const dy=this.y-balls[j].y;
            const distance=Math.sqrt(dx*dx+dy*dy);

            if(distance<this.size+balls[j].size){ //충돌이 감지되면
                balls[j].color=this.color='rgb('+random(0,255)+','+random(0, 255)+','+random(0,255)+')';
            }
        }
    }
}

//animating the ball
let balls=[];

while(balls.length<25){
    let size=random(10,20);
    let ball=new Ball(
        random(0+size, width-size),
        random(0+size, height-size),
        random(-7,7),
        random(-7,7),
        'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')',size
    );

    balls.push(ball);
}

/*
사물을 애니메이션화하는 모든 프로그램 -> 일반적으로 애니메이션 루프를 포함한다.
애니메이션 루프 : 프로그램 정보를 업데이트한 다음 애니메이션의 각 프레임에 결과 뷰를 렌더링하는 역할을 한다.
*/

function loop(){
    ctx.fillStyle='rgba(0,0,0,0.25)'; //캔버스를 반투명 검은색으로 채움
    ctx.fillRect(0,0,width,height); //캔버스 전체를 덮는 사각형 그림
    //다음 프레임이 그려지기 전에 이전 프레임의 도면을 덮는 역할

    for(let i=0; i<balls.length; i++){
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop); //loop함수 다시 실행.
    //이 메서드가 반복되어 실행되고 동일한 함수 이름을 전달하면, 초당 설정된 횟수만큼 기능을 실행하여 매끄러운 애니메이션을 만든다.
    //함수가 실행될때마다 자체 호출되므로 반복된다.
}

loop();




