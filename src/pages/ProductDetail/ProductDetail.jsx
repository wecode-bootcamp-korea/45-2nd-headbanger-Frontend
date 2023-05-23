import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { flexSort } from '../../styles/mixin';
import { setProductData } from '../../actions';
import useFetchData from '../../components/customhooks/useFetchData';
import TitleLine from './components/TitleLine';
import PentagonGraph from './components/PentagonGraph';
import Pictures from './components/Pictures';
import ViewMap from './components/ViewMap';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const productData = useSelector(state => state.productData);

  useFetchData('/data/camping1data.json', dispatch, setProductData);

  if (!productData) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <FlexCenter>
        <FlexStart>
          <PentagonGraph />
          <TitleLine />
        </FlexStart>
      </FlexCenter>
      <Pictures />
      <ViewMap />
    </Container>
  );
};

export default ProductDetail;

const Container = styled.div`
  margin-top: 40px;

  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FlexCenter = styled.div`
  ${flexSort('space-between', 'center')};
  height: 100px;
  width: 1100px;
`;
const FlexStart = styled.div`
  ${flexSort('center', 'center')}
  gap:30px;
`;
