import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductData } from '../../actions';
import useFetchData from '../../components/customhooks/useFetchData';
import TitleLine from './components/TitleLine';
import PentagonGraph from './components/PentagonGraph';
import Pictures from './components/Pictures';
import ViewMap from './components/ViewMap';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { flexSort } from '../../styles/mixin';
import ProductNav from './components/ProductNav';
import EmojiDescription from './components/EmojiDescription';
import TxtDescription from './components/TxtDescription';
import RemoteCon from './components/RemoteCon';
import Facilities from './components/Facilities';
import CalendarProduct from './components/CalendarProduct';

const ProductDetail = () => {
  const overviewRef = useRef();
  const featuresRef = useRef();
  const facilitiesRef = useRef();
  const dispatch = useDispatch();
  const productData = useSelector(state => state.productData);

  useFetchData('/data/camping1data.json', dispatch, setProductData);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Pictures />{' '}
      <ProductNavWrapper>
        <ProductNav overviewRef={overviewRef} featuresRef={featuresRef} />
      </ProductNavWrapper>
      <div ref={overviewRef}>
        <FlexCenter>
          <FlexStart>
            <PentagonGraph />
            <TitleLine />
          </FlexStart>
        </FlexCenter>
      </div>
      <SpaceBetween>
        <LeftSection>
          <EmojiDescription />

          <div ref={featuresRef}>
            <TxtDescription />
          </div>
          <Facilities />
          <CalendarProduct />
        </LeftSection>
        <RightSection>
          <RemoteCon />
        </RightSection>
      </SpaceBetween>
      <ViewMap />
    </Container>
  );
};

export default ProductDetail;

const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
`;

const FlexCenter = styled.div`
  ${flexSort('space-between', 'center')};
  height: 150px;
  width: 1100px;
  padding: 10px;

  border: 1px solid ${theme.borderGrey};
`;

const FlexStart = styled.div`
  ${flexSort('center', 'center')}
  gap:30px;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1100px;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ProductNavWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
`;
