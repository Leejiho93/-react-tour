import styled from 'styled-components';
import { Card } from 'antd';
import Image from 'next/image';

export const CardImage = styled(Image)`
  width: 280px;
  height: 220px;
  margin: 0 auto;
`;

export const CardWrapper = styled(Card)`
  width: 300px;
  height: 340px;
  margin: 10px;
`;

export const CardMeta = styled(Card.Meta)`
  text-align: center;
  padding: 0px;

  &.ant-card-meta-title {
    font-weight: bold;
  }
`;
