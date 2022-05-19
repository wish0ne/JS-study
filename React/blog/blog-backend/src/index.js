const Koa = require('koa');

const app = new Koa(); //app 생성

//use() : 미들웨어 함수를 애플리케이션에 등록
//Koa의 미들웨어 함수는 두개의 파라미터를 받음(ctx, next)
//ctx : Context. 웹 요청과 응답에 관한 정보를 지님
//next : 현재 처리중인 미들웨어의 다음 미들웨어어를 호출하는 함수
//미들웨어는 app.use를 사용하여 등록되는 순서대로 처리됨
app.use(async (ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  //조건부 미들웨어 처리
  if (ctx.query.authorized !== '1') {
    ctx.status = 401; //Unauthorized
    return;
  }
  //next를 호출하지 않으면 뒤의 미들웨어들은 모두 무시됨
  //next 함수는 Promise를 반환. 다음 처리해야할 미들웨어가 끝나면 Promise 완료
  await next();
  console.log('END');
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.use((ctx) => {
  ctx.body = 'hello world';
});

//4000번 포트로 서버 동작
app.listen(4000, () => {
  console.log('Listening to port 4000');
});
