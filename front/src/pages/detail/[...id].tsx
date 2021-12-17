import router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import DetailItem from '../../components/DetailItem';
import { IReducerState, RootState } from '../../modules';
import { detailAsync } from '../../modules/detail';
import Kakaomap from '../../components/Kakaomap';
import { DtailWrapper } from './style';
import CommentForm from '../../containers/CommentForm';
import { loadCommentAsync } from '../../modules/comment';
import CommentItem from '../../components/CommentItem';
import CommentList from '../../components/CommentList';
import { SagaStore, wrapper } from '../_app';
import axios from 'axios';
import { loadUserAsync } from '../../modules/user';
import { END } from 'redux-saga';
import { NextPage } from 'next';

const Detail: NextPage<IReducerState> = ({ detail }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { data, loading } = useSelector(
  //   (state: RootState) => state.detail.detailResult
  // );
  // const { item } = data.items;
  const { item } = detail.detailResult.data.items;

  const { commentList } = useSelector((state: RootState) => state.comment);
  const contentId = router.query.id && router.query.id[1];
  const contentTypeId = router.query.id && router.query.id[0];

  useEffect(() => {
    console.log('detail: ', item);
  });
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
      {item && <DetailItem item={item} />}
      {item && <Kakaomap item={item} />}
      {commentList && <CommentList data={commentList} />}
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
      await (store as SagaStore).sagaTask!.toPromise();
    }
);

export default connect((state: IReducerState) => state)(Detail);
