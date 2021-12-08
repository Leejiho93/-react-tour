import { Skeleton } from 'antd';
import styled from 'styled-components';

// export const ImageSkeleton = styled(Skeleton.Button)`
//   width: 400px;
// `;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 100px;
`;

export const SkeletonBox = styled.div`
  width: 400px;
  height: 250px;
  margin: 5px;
`;

export const ImageSkeleton = styled.div`
  @-webkit-keyframes loading {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  @keyframes loading {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  width: 400px;
  height: 250px;

  -webkit-animation: loading 1.5s infinite ease-in-out;
  animation: loading 1.5s infinite ease-in-out;
`;
