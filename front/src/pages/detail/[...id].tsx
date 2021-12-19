import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import DetailItem from '../../components/DetailItem';
import { IReducerState, RootState } from '../../modules';
import { detailAsync } from '../../modules/detail';
import { DtailWrapper } from './style';
import CommentForm from '../../containers/CommentForm';
import { loadCommentAsync } from '../../modules/comment';
import CommentList from '../../components/CommentList';
import { SagaStore, wrapper } from '../_app';
import axios from 'axios';
import { loadUserAsync } from '../../modules/user';
import { END } from 'redux-saga';
import { NextPage } from 'next';
import DetailSkeleton from '../../components/DetailSkeleton';

const Detail: NextPage<IReducerState> = ({ detail }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { item } = detail.detailResult.data.items;
  const { loading } = detail.detailResult;
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
    <DtailWrapper>
      {!loading && item ? <DetailItem item={item} /> : <DetailSkeleton />}
      {<CommentList data={commentList} />}
      {item && <CommentForm item={item} />}
    </DtailWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers!.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers!.Cookie = cookie;
      }
      if (!store.getState().user.me) {
        store.dispatch(loadUserAsync.request());
      }
      store.dispatch(END);
      return await (store as SagaStore).sagaTask!.toPromise();
    }
);

export default connect((state: IReducerState) => state)(Detail);
