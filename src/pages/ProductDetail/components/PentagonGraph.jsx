import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { flexSort, fontMix } from '../../../styles/mixin';
import theme from '../../../styles/theme';

const PentagonGraph = () => {
  const productData = useSelector(state => state.productData);

  if (!productData) {
    return <div>로딩 중...</div>;
  }

  const { grades } = productData;

  const data = Object.values(grades);
  const maxRating = 5;

  const graphSize = 90;
  const svgSize = 150;
  const labelOffset = 20;
  const textDistance = 20; // text distance factor from the center of the graph
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;
  const angleStep = (Math.PI * 2) / data.length;
  const angles = data.map((d, i) => angleStep * i - Math.PI / 2);

  const points = data.map((d, i) => {
    const radius = (d / maxRating) * (graphSize / 2);
    const x = Math.cos(angles[i]) * radius + centerX;
    const y = Math.sin(angles[i]) * radius + centerY;
    return { x, y };
  });

  const maxPoints = data.map((d, i) => {
    const radius = graphSize / 2;
    const x = Math.cos(angles[i]) * radius + centerX;
    const y = Math.sin(angles[i]) * radius + centerY;
    return { x, y };
  });

  const labels = ['안락함', '안전함', '가성비', '청결도', '편리함'];

  const labelPoints = maxPoints.map((p, i) => {
    const x =
      p.x + Math.cos(angles[i]) * (i === 1 || i === 4 ? textDistance : 0);
    const y =
      p.y + Math.sin(angles[i]) * (i === 1 || i === 4 ? textDistance : 0);
    return { x, y };
  });

  return (
    <Container>
      <Graph
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        preserveAspectRatio="xMidYMid meet"
        svgSize={svgSize}
      >
        <polygon
          points={maxPoints.map(p => `${p.x},${p.y}`).join(' ')}
          fill="#eee"
          stroke="#000"
        />
        <polygon
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="#f9dd4a"
          stroke="#000"
        />
        {labelPoints.map((p, i) => {
          let dyValue;
          switch (i) {
            case 0:
              dyValue = '-1em'; // 안락함
              break;
            case 1:
              dyValue = '1em'; // 안전함
              break;
            case 2:
              dyValue = '1.5em'; // 가성비
              break;
            case 3:
              dyValue = '1.5em'; // 청결도
              break;
            case 4:
              dyValue = '1em'; // 편리함
              break;
            default:
              dyValue = '1em';
          }

          return (
            <text x={p.x} y={p.y} textAnchor="middle" dy={dyValue} key={i}>
              {labels[i]}
            </text>
          );
        })}
      </Graph>
    </Container>
  );
};

export default PentagonGraph;

const Container = styled.div`
  ${fontMix(10, theme.mainBlack)}
  margin-top: 40px;
`;

const Graph = styled.svg`
  width: ${({ svgSize }) => svgSize}px;
  height: ${({ svgSize }) => svgSize}px;
`;
