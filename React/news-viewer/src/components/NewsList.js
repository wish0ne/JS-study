//API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해주는 컴포넌트
import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

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
  //usePromise 파라미터 1. 함수 2. deps
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=d3d28ade4d0640628688e7fdb8663866`,
    );
  }, [category]);

  //대기중일때
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }

  //아직 response값이 설정되지 않았을때
  if (!response) {
    return null;
  }

  //에러가 발생했을때
  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }

  //response값이 유효할때
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
