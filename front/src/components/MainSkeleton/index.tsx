import * as React from 'react';
import { ImageSkeleton, SkeletonBox, Wrapper } from './style';

const MainSkelton: React.FC = () => {
  return (
    <Wrapper>
      <SkeletonBox>
        <ImageSkeleton />
      </SkeletonBox>
      <SkeletonBox>
        <ImageSkeleton />
      </SkeletonBox>
      <SkeletonBox>
        <ImageSkeleton />
      </SkeletonBox>
      <SkeletonBox>
        <ImageSkeleton />
      </SkeletonBox>
      <SkeletonBox>
        <ImageSkeleton />
      </SkeletonBox>
      <SkeletonBox>
        <ImageSkeleton />
      </SkeletonBox>
    </Wrapper>
  );
};

export default MainSkelton;
