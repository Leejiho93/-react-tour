import Head from 'next/head';
import { ReactElement } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Search from '../containers/SearchForm';

const Li = styled.li`
  float: left;
  margin-left: 10px;
`;

const Home = () => {
  return (
    <>
      {/* <Search /> */}
      <ul>
        <Li>전체</Li>
        <Li>관광지</Li>
        <Li>문화시설</Li>
        <Li>축제</Li>
        <Li>코스</Li>
        <Li>레포츠</Li>
        <Li>숙박</Li>
        <Li>음식점</Li>
      </ul>
      <div></div>
    </>
  );
};

export default Home;

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };
