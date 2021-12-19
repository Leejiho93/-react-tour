import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleBox = styled.div`
  width: 100%;
  height: 150px;
  padding: 50px 0;
  ${({ theme }) => theme.window.laptop} {
    padding: 100px 0 50px;
    height: 200px;
    width: 90%;
  }
  ${({ theme }) => theme.window.tablet} {
    height: 195px;
  }
  ${({ theme }) => theme.window.mobileL} {
    height: 190px;
  }
`;

export const TitleSkeleton = styled.div`
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
  width: 100%;
  height: 50px;
  -webkit-animation: loading 1.5s infinite ease-in-out;
  animation: loading 1.5s infinite ease-in-out;
  ${({ theme }) => theme.window.laptop} {
    width: 100%;
  }
  ${({ theme }) => theme.window.tablet} {
    height: 45px;
    width: 100%;
  }
  ${({ theme }) => theme.window.mobileL} {
    height: 40px;
  }
`;
export const SkeletonBox = styled.div`
  width: 980px;
  height: 654px;
  margin: 5px;
  ${({ theme }) => theme.window.pc} {
  }
  ${({ theme }) => theme.window.laptop} {
    width: 90%;
    text-align: center;
  }
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
  width: 980px;
  height: 654px;
  -webkit-animation: loading 1.5s infinite ease-in-out;
  animation: loading 1.5s infinite ease-in-out;
  ${({ theme }) => theme.window.laptop} {
    width: 100%;
  }
  ${({ theme }) => theme.window.tablet} {
    width: 100%;
  }
  ${({ theme }) => theme.window.mobileL} {
  }
`;
