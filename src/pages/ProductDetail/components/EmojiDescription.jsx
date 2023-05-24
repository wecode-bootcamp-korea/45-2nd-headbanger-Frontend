import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { boxSize, flexSort, fontMix } from '../../../styles/mixin';
import {
  gradeDescriptions,
  locationDescriptions,
  environmentDescriptions,
} from './GRADEDESCRIPTIONS';

const EmojiDescription = () => {
  const grades = useSelector(state => state.productData.grades);
  const locationCategory = useSelector(
    state => state.productData.location_category
  );
  const environment = useSelector(state => state.productData.environment);

  const maxGrade = Math.max(...Object.values(grades));
  const maxGradeDescription =
    gradeDescriptions[
      Object.keys(grades).find(key => grades[key] === maxGrade)
    ];

  const locationDescription = locationDescriptions[locationCategory];
  const environmentDescription = environmentDescriptions[environment];

  return (
    <Container>
      <FlexCenter>
        <Box>
          <Emoji>{maxGradeDescription.emoji}</Emoji>
          <Label>{maxGradeDescription.label}</Label>
        </Box>
        <Box>
          <Emoji>{locationDescription.emoji}</Emoji>
          <Label>{locationDescription.label}</Label>
        </Box>
        <Box>
          <Emoji>{environmentDescription.emoji}</Emoji>
          <Label>{environmentDescription.label}</Label>
        </Box>
      </FlexCenter>
    </Container>
  );
};

export default EmojiDescription;

const Container = styled.div`
  width: 600px;
  height: 100%;
  line-height: 1.5;
`;
const FlexCenter = styled.div`
  ${flexSort('space-between', 'center')}
`;

const Box = styled.div`
  ${flexSort('space-between', 'center')}
  ${boxSize(188, 88)}
  border: 1px solid ${theme.borderGrey};
  border-radius: 12px;
  padding: 16px 24px;
  word-break: keep-all;
  line-break: strict;
`;

const Emoji = styled.span`
  font-size: 24px;
  margin-right: 16px;
`;

const Label = styled.span`
  font-size: 16px;
`;
