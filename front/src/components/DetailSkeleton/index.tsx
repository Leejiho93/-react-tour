import React from 'react';
import {
  ImageSkeleton,
  SkeletonBox,
  TitleBox,
  TitleSkeleton,
  Wrapper,
} from './style';

const DetailSkeleton = () => {
  return (
    <Wrapper>
      <TitleBox>
        <TitleSkeleton />
      </TitleBox>
      <SkeletonBox>
        <ImageSkeleton />
      </SkeletonBox>
    </Wrapper>
  );
};

export default DetailSkeleton;
