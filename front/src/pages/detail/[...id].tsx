import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailItem from '../../components/DetailItem';
import { RootState } from '../../modules';
import { detailAsync } from '../../modules/detail';
import Kakaomap from '../../components/Kakaomap';
import { DtailWrapper } from './style';
import CommentForm from '../../containers/CommentForm';
import { loadCommentAsync } from '../../modules/comment';
import CommentItem from '../../components/CommentItem';
import CommentList from '../../components/CommentList';

const Detail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state: RootState) => state.detail.detailResult
  );
  const { item } = data.items;

  const { commentList } = useSelector((state: RootState) => state.comment);
  const contentId = router.query.id && router.query.id[1];
  const contentTypeId = router.query.id && router.query.id[0];

  useEffect(() => {
    // console.log('detail page contentId', contentId);
    // console.log('detail page contentTypeId', contentTypeId);
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
      {/* {item && contentTypeId !== '25' ? <Kakaomap item={item} /> : null} */}
      {item && <Kakaomap item={item} />}
      {commentList && <CommentList data={commentList} />}
      {item && <CommentForm item={item} />}
      {/* {commentList && <CommentList data={commentList.data} />} */}
    </DtailWrapper>
  );
};

export default Detail;
