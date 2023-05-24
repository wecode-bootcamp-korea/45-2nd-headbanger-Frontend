import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { boxSize } from '../../../styles/mixin';

const Pictures = () => {
  const pictures = useSelector(state => state.productData.pictures);
  const thumbnail = useSelector(state => state.productData.thumbnail);

  return (
    <ImageContainer>
      <MainImage src={thumbnail} alt="thumbnail" />
      <ThumbnailGrid>
        {pictures.slice(0, 4).map((picture, index) => (
          <ThumbnailImage key={index} src={picture} alt={`picture-${index}`} />
        ))}
      </ThumbnailGrid>
    </ImageContainer>
  );
};

export default Pictures;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 535px 1fr;
  grid-gap: 10px;
`;

const MainImage = styled.img`
  ${boxSize(530, 400)};
  transition: filter 0.3s ease;
  &:hover {
    filter: brightness(80%);
    cursor: pointer;
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const ThumbnailImage = styled.img`
  ${boxSize(270, 195)};
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(80%);
    cursor: pointer;
  }
`;
