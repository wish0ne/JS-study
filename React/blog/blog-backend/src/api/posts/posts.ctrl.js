import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

//id가 올바른 ObjectId 형식인지 검증하는 미들웨어 생성
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    //포스트가 존재하지 않을때
    if (!post) {
      ctx.status = 404; //Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/*포스트 작성
POST /api/posts
{
  title : '제목',
  body:'내용,
  tags:['태그1', '태그2']
}
*/
export const write = async (ctx) => {
  //request body 검증 추가
  const schema = Joi.object().keys({
    //객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), //required가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), //문자열로 이루어진 배열
  });

  //검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }
  const { title, body, tags } = ctx.request.body;
  //인스턴스 생성
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user,
  });
  try {
    //DB에 저장
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 목록 조회
GET /api/posts
*/
export const list = async (ctx) => {
  //query는 문자열이므로 숫자로 변환해야함
  //page값이 주어지지 않았다면 1페이지로 간주
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;
  //tag, username 값이 유효하면 객체안에 넣고, 그렇지 않으면 넣지않음
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    //find()로 모델 인스턴스의 데이터 조회
    //find()호출 후 exec()를 붙여줘야 서버에 쿼리를 요청함.
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      //.lean()
      .exec(); //최근포스트부터 보여주기 위해 _id로 내림차순 정렬
    //한번에 10개만 보여주기 위해서 limit
    //skip으로 처음 10개씩 제외하고 그 다음 데이터를 보여줌

    //Last-Page라는 커스텀 HTTP 헤더를 통해 마지막 페이지 번호 알려줌
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));

    //내용 200자 제한
    //find()로 조회한 데이터는 mongoose 문서 인스턴스 형태이므로 바로 변형 불가
    //JSON 형태로 변환한 뒤 변형해야함
    //위에 lean()함수 사용하면 데이털르 처음부터 JSON 형태로 조회가능
    ctx.body = posts
      .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body:
          post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; //No Content(성공하기는 했지만 응답할 데이터 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{
  title : '제목',
  body:'내용,
  tags:['태그1', '태그2']
}
*/
export const update = async (ctx) => {
  //request body 검증 추가
  const schema = Joi.object().keys({
    //write의 schema와 유사하지만 required가 없음
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  //검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }

  const { id } = ctx.params;
  try {
    //findByIdAndUpdate(id, 업데이트 내용, 업데이트 옵션)
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, //이 값을 설정하면 업데이트된 데이터 반환
      //false일때는 업데이트 되기 전의 데이터 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
