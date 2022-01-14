//API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해주는 컴포넌트
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  //loading 상태를 통해 API 요청이 대기중인지 판별.
  const [loading, setLoading] = useState(false);

  // useEffect 이용해 컴포넌트가 처음 렌더링되는 시점에 API를 요청
  //이때 useEffect에 등록하는 함수에 async를 붙이면 안됨. useEffect에서 반환해야하는값은 뒷정리함수이기 때문.
  //따라서 useEffect 내부에 async/await를 사용하고 싶다면 함수 내부에 async가 붙은 또다른 함수를 만들어서 사용해줘야함.
  useEffect(() => {
    //async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=d3d28ade4d0640628688e7fdb8663866`,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]); //cateogry값이 바뀔때마다 뉴스를 새로 불러와야하므로 의존배열에 category 넣어줌.

  //대기중일때
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }

  //아직 articles 값이 설정되지 않았을때
  //articles 배열에 map 함수를 사용하기 전에 꼭 !articles를 조회하여 해당값이 현재 null이 아닌지 검사해야함!
  //이 작업이 없으면 아직 데이터가 없을때(null인 경우)에는 map함수가 없기 때문에 렌더링 과정에서 오류가 발생. 그래서 흰 화면만 보이게됨.
  if (!articles) {
    return null;
  }

  //articles값이 유효할때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
