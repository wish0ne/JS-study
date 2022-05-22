import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

//모델 메서드 : 모델에서 사용할 수 있는 함수
//1. 인스턴스 메서드 : 모델을 통해 만든 문서 인스턴스에서 사용할 수 있는 함수
//2. 스태틱 메서드 : 모델에서 바로 사용할 수 있는 함수

//1. 인스턴스 메서드 (this를 사용하기 위해 화살표 함수가 아니라 function 키워드로 구현해야함)
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    //첫번째 파라미터에는 토근안에 집어넣고 싶은 데이터를 넣음
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET, //두번째 파라미터는 JWT 암호
    {
      expiresIn: '7d', //7일동안 유효
    },
  );
  return token;
};

//2. 스태틱 메서드
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;
