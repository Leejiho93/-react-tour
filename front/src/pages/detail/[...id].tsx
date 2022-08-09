import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import DetailItem from '../../components/DetailItem';
import { IReducerState, RootState } from '../../modules';
import { detailAsync } from '../../modules/detail';
import CommentForm from '../../containers/CommentForm';
import { loadCommentAsync } from '../../modules/comment';
import CommentList from '../../components/CommentList';
import { SagaStore, wrapper } from '../_app';
import axios from 'axios';
import { loadUserAsync } from '../../modules/user';
import { END } from 'redux-saga';
import { NextPage } from 'next';
import DetailSkeleton from '../../components/DetailSkeleton';
import { DtailWrapper } from '../../../styles/common';
import Layout from '../../components/Layout';

const Detail: NextPage<IReducerState> = ({ detail }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { item } = detail.detailResult.data.items;
  const { commentList } = useSelector((state: RootState) => state.comment);
  const contentId = router.query.id && router.query.id[1];
  const contentTypeId = router.query.id && router.query.id[0];

  useEffect(() => {
    dispatch(
      detailAsync.request({
        contentTypeId: Number(contentTypeId),
        contentId: Number(contentId),
      })
    );
  }, [contentId, contentTypeId, dispatch]);
  useEffect(() => {
    dispatch(loadCommentAsync.request({ contentId: Number(contentId) }));
  }, [contentId, dispatch]);
  return (
    <Layout>
      <DtailWrapper>
        {item ? <DetailItem item={item[0]} /> : <DetailSkeleton />}
        {<CommentList data={commentList} />}
        {item && <CommentForm item={item[0]} />}
      </DtailWrapper>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';
      if (axios.defaults.headers) {
        req && cookie
          ? (axios.defaults.headers.Cookie = cookie)
          : (axios.defaults.headers.Cookie = '');
      }

      store.dispatch(loadUserAsync.request());

      store.dispatch(END);
      await (store as SagaStore).sagaTask.toPromise();
      return { props: {} };
    }
);

export default connect((state: IReducerState) => state)(Detail);
