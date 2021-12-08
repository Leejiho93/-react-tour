import styled from 'styled-components';
import { Card, Image } from 'antd';

export const Img = styled.img`
  width: 280px;
  height: 220px;
  margin: 0 auto;
  ${({ theme }) => theme.window.pc} {
    // width: 100%;
  }
`;

export const ImageReady = styled(Image)`
  width: 270px;
  height: 220px;
  margin: 0 auto;
  ${({ theme }) => theme.window.pc} {
    // width: 100%;
  }
`;

export const CardWrapper = styled(Card)`
  width: 300px;
  height: 320px;
  margin: 10px;
`;

export const CardMeta = styled(Card.Meta)`
  text-align: center;
  &.ant-card-meta-title {
    font-weight: bold;
  }
`;
