import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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

//2. 스태틱 메서드
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;
