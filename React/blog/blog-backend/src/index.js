require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 생성
//node.js에서 환경변수는 process.env 값을 통해 조회
const { PORT, MONGO_URI } = process.env;

//mongoose로 서버와 DB 연결
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const api = require('./api');

const app = new Koa(); //app 생성
const router = new Router(); //Router 인스턴스 생성

//라우터 설정
router.use('/api', api.routes()); //api 라우트 적용

//라우터 적용 전에 bodyParser 적용
//http 메서드의 Request body에 JSON 형식으로 데이터를 넣어주면 이를 파싱하여 서버에서 사용할 수 있게 함.
app.use(bodyParser());

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//포트가 지정되어 있지 않다면 4000 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
