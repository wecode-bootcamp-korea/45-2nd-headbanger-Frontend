import React from 'react';
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
import Description from './components/Description';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const productData = useSelector(state => state.productData);

  useFetchData('/data/camping1data.json', dispatch, setProductData);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Pictures />
      <ProductNav />
      <FlexCenter>
        <FlexStart>
          <PentagonGraph />
          <TitleLine />
        </FlexStart>
      </FlexCenter>
      <ViewMap />
      <Description />
    </Container>
  );
};

export default ProductDetail;

const Container = styled.div`
  margin-top: 20px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FlexCenter = styled.div`
  ${flexSort('space-between', 'center')};
  height: 150px;
  width: 1100px;
  margin-top: 20px;
  padding: 10px;

  border: 1px solid ${theme.borderGrey};
`;

const FlexStart = styled.div`
  ${flexSort('center', 'center')}
  gap:30px;
`;
