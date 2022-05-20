import Post from './models/post';

export default function createFakeData() {
  //0,1,...39로 이루어진 배열을 생성한 후 포스트 데이터로 반환
  const posts = [...Array(40).keys()].map((i) => ({
    title: `포스트 #${i}`,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sem enim, euismod vel sapien sit amet, elementum dictum elit. Cras varius mauris id pellentesque commodo. Duis eget aliquam nisl. Aliquam eros dui, varius a ullamcorper fringilla, tempor at neque. Praesent non leo convallis mauris cursus dictum vel non lorem. Fusce ornare ultrices lorem non consectetur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    tags: ['가짜', '데이터'],
  }));

  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}
