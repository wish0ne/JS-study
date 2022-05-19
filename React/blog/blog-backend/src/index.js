const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa(); //app 생성
const router = new Router(); //Router 인스턴스 생성

//라우터 설정
//router.get(라우트 경로, 해당 라우트에 적용할 미들웨어 함수)
//여기서 get은 http 메서드
// router.get('/', (ctx) => {
//   ctx.body = '홈';
// });

// router.get('/about/:name?', (ctx) => {
//   const { name } = ctx.params;
//   //name의 존재 유무에 따라 다른 결과 출력
//   ctx.body = name ? `${name}의 소개` : '소개';
// });

// router.get('/posts', (ctx) => {
//   const { id } = ctx.query;
//   ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니n 다.';
// });

//라우터 설정
router.use('/api', api.routes()); //api 라우트 적용

//라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//4000번 포트로 서버 동작
app.listen(4000, () => {
  console.log('Listening to port 4000');
});
