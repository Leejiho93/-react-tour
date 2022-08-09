import * as React from 'react';
import { ImageSkeleton, Wrapper } from './style';

const KategorySkeleton: React.FC = () => {
  return (
    <Wrapper>
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
    </Wrapper>
  );
};

export default KategorySkeleton;
