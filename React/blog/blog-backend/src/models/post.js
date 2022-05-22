import mongoose from 'mongoose';

const { Schema } = mongoose;

//스키마 생성
//필드이름 : 필드 데이터 타입
//필드의 기본값은 default값으로 설정
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now, //현재 날짜를 기본값으로 지정
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

//모델 인스턴스 생성
//model(스키마 이름, 스키마 객체);
//DB는 스키마 이름을 정해주면 그 이름의 복수 형태로 DB에 컬렉션 생성
const Post = mongoose.model('Post', PostSchema);
export default Post;
