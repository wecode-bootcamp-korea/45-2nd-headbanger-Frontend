import React, { useState } from 'react';
import styled from 'styled-components';
import campView from '../../../assets/images/ProductDetail/campingsites.jpg';
import { boxes } from './BOXES.js';
import { lighten } from 'polished';

const getColor = id => {
  switch (id[0]) {
    case 'A':
      return 'orange';
    case 'B':
      return 'yellow';
    case 'C':
      return 'blue';
    default:
      return 'red';
  }
};

const renderBoxes = (handleBoxHover, hoveredBox) => {
  return boxes.map(box => {
    const color = getColor(box.id);
    const centerX = (box.x1 + box.x3) / 2;
    const centerY = box.y1 + 15; // 값에따라 글씨의 y축위치가 바뀜
    const isHovered = hoveredBox && box.id === hoveredBox.id;

    return (
      <g key={box.id}>
        <Box
          points={`${box.x1},${box.y1} ${box.x2},${box.y2} ${box.x3},${box.y3} ${box.x4},${box.y4}`}
          color={color}
          isHovered={isHovered}
          onMouseEnter={() => handleBoxHover(box)}
          onMouseLeave={() => handleBoxHover(null)}
        />
        <text
          x={centerX}
          y={centerY}
          fontSize="16"
          textAnchor="middle"
          fill="Black"
          onMouseEnter={() => handleBoxHover(box)}
          onMouseLeave={() => handleBoxHover(null)}
        >
          {box.id}
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          fontSize="12"
          textAnchor="middle"
          fill="Black"
          onMouseEnter={() => handleBoxHover(box)}
          onMouseLeave={() => handleBoxHover(null)}
        >
          {box.size}
        </text>
      </g>
    );
  });
};

const ViewMap = () => {
  const [hoveredBox, setHoveredBox] = useState(null);

  const handleBoxHover = box => {
    setHoveredBox(box);
  };

  return (
    <Container>
      <ImageContainer hoveredBox={hoveredBox}>
        <Image src={campView} alt="공유하기" />
        <Svg>{renderBoxes(handleBoxHover, hoveredBox)}</Svg>
        {hoveredBox && (
          <HoveredBoxInfo>{`가격 : ${hoveredBox.price} 권장인원 : ${hoveredBox.people}`}</HoveredBoxInfo>
        )}
      </ImageContainer>
    </Container>
  );
};

export default ViewMap;

const Container = styled.div`
  margin-top: 40px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  filter: ${props => (props.hoveredBox ? 'brightness(70%)' : 'none')};
`;

const Image = styled.img`
  width: 569px;
  height: 350px;
`;

const HoveredBoxInfo = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 10px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  font-weight: bold;
`;

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 569px;
  height: 350px;
`;

const Box = styled.polygon`
  fill: ${props =>
    props.isHovered
      ? lighten(0.2, props.color)
      : props.color || 'rgba(255, 0, 0, 0.3)'};
  stroke: ${props => props.color || 'red'};
  stroke-width: 0;
  transition: fill 0.2s;
`;
