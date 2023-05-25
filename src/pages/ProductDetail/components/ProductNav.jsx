import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import theme from '../../../styles/theme';
import { flexSort, fontMix } from '../../../styles/mixin';

const ProductNav = ({ overviewRef, featuresRef, facilitiesRef }) => {
  const productData = useSelector(state => state.productData);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const { prices } = productData;

  return (
    <Container>
      <SectionButton
        onClick={() =>
          overviewRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      >
        개요
      </SectionButton>
      <SectionButton
        onClick={() =>
          featuresRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      >
        특징
      </SectionButton>
      <SectionButton
        onClick={() =>
          facilitiesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      >
        편의시설
      </SectionButton>
      <SectionButton>조감도</SectionButton>
      <SectionButton>이용후기</SectionButton>
      <SectionButton>주변지도</SectionButton>
      <RightSection>
        <StartingPrice>시작가</StartingPrice>
        <Price>{prices.small}원</Price>
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  width: 1100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${theme.borderGrey};
  padding: 0 20px;
`;

const SectionButton = styled.button`
  background: none;
  border: none;
  color: #000;
  padding: 8px;
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #ffcc00;
    border-bottom: 2px solid #ffcc00;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const StartingPrice = styled.span`
  ${fontMix(8, theme.mainBlack)}
  margin-right: 8px;
`;

const Price = styled.span`
  font-size: 16px;
  color: red;
`;

export default ProductNav;
