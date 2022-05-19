const Koa = require('koa');

const app = new Koa(); //app 생성

//4000번 포트로 서버 동작
app.listen(4000, () => {
  console.log('Listening to port 4000');
});
