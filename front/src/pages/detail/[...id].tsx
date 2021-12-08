import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailItem from '../../components/DetailItem';
import { RootState } from '../../modules';
import { detailAsync } from '../../modules/detail';
import Kakaomap from '../../components/Kakaomap';
import { DtailWrapper } from './style';

const Detail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state: RootState) => state.detail.detailResult
  );
  const { item } = data.items;

  const contentId = router.query.id && router.query.id[1];
  const contentTypeId = router.query.id && router.query.id[0];

  useEffect(() => {
    console.log('detail page contentId', contentId);
    console.log('detail page contentTypeId', contentTypeId);
    dispatch(
      detailAsync.request({
        contentTypeId: Number(contentTypeId),
        contentId: Number(contentId),
      })
    );
  }, [contentId, contentTypeId, dispatch]);

  return (
    <DtailWrapper>
      {item && <DetailItem item={item} />}
      {/* {item && contentTypeId !== '25' ? <Kakaomap item={item} /> : null} */}
      {item && <Kakaomap item={item} />}
    </DtailWrapper>
  );
};

export default Detail;
