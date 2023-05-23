import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';
import { fontMix, flexSort } from '../../../styles/mixin';
import shareImg from '../../../assets/images/ProductDetail/share.svg';
import wishImg from '../../../assets/images/ProductDetail/wish.svg';

const TitleLine = () => {
  const productData = useSelector(state => state.productData);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const { name, location, averagegrades, review } = productData;
  const reviewCount = review.length;

  return (
    <Container>
      <div>
        <NameContainer>
          <Name>{name}</Name>
        </NameContainer>

        <SubTitle>
          <Rating>{averagegrades} / 5.0 점</Rating>
          <Divider>|</Divider>
          <ReviewCount>{reviewCount}개의 후기</ReviewCount>
          <Divider>|</Divider>
          <Location>{location}</Location>
        </SubTitle>
      </div>
      <div>
        <ShareThings>
          <div>
            <img src={shareImg} alt="공유하기" /> 공유하기
          </div>
          <div>
            <img src={wishImg} alt="위시리스트" /> 저장
          </div>
        </ShareThings>
      </div>
    </Container>
  );
};

export default TitleLine;

const Container = styled.div`
  ${flexSort('space-between', 'flex-end')};
  margin-top: 40px;
  margin-right: 40px;
  width: 880px;
`;

const NameContainer = styled.div`
  ${flexSort('flex-start', 'center')};
`;

const Name = styled.div`
  ${fontMix(32, theme.mainBlack)};
`;

const SubTitle = styled.h2`
  ${fontMix(16, theme.mainBlack)};
  display: flex;
  align-items: center;
`;

const Rating = styled.span`
  margin-right: 8px;
`;

const Divider = styled.span`
  margin: 0 4px;
  color: ${theme.mainYellow};
  font-weight: bold;
`;

const ReviewCount = styled.span`
  margin-right: 8px;
`;

const Location = styled.span``;
const ShareThings = styled.div`
  ${flexSort('center', 'center')}
  gap:30px;
  img {
    width: 16px;
    height: 16px;
  }
`;
