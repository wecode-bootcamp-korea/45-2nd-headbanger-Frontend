import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { facilitiesData } from './FACILITIESDATA';
import { Title } from './TxtDescription';
import { flexSort, fontMix } from '../../../styles/mixin';
import theme from '../../../styles/theme';

const FacilitiesComponent = () => {
  const productData = useSelector(state => state.productData);
  const { checkin, checkout, services } = productData;

  const sortedFacilitiesData = facilitiesData.sort(
    (a, b) => services[b.availableKey] - services[a.availableKey]
  );

  return (
    <FacilitiesContainer>
      <Title>편의시설/서비스</Title>
      <CheckTime>
        <p>체크인 : {checkin}</p>
        <p>체크아웃 : {checkout}</p>
      </CheckTime>
      <SpaceBetween>
        {sortedFacilitiesData.map(facility => (
          <FacilityItem key={facility.name}>
            <SpaceBetween>
              <FacilityIcon available={services[facility.availableKey]}>
                {services[facility.availableKey] && (
                  <Emoji>{facility.emoji}</Emoji>
                )}
              </FacilityIcon>
              {services[facility.availableKey] ? (
                <FacilityName available={services[facility.availableKey]}>
                  {facility.name}
                </FacilityName>
              ) : (
                <>
                  <CancellationIcon>&#10060;</CancellationIcon>
                  <FacilityName available={services[facility.availableKey]}>
                    <CancellationText>{facility.name}</CancellationText>
                  </FacilityName>
                </>
              )}
            </SpaceBetween>
          </FacilityItem>
        ))}
      </SpaceBetween>
    </FacilitiesContainer>
  );
};

export default FacilitiesComponent;

const FacilitiesContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-bottom: 1px solid ${theme.borderGrey};
`;
const CheckTime = styled.div`
  line-height: 1.5;
  ${fontMix(16, theme.mainBlack)}
`;
const FacilityItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const SpaceBetween = styled.div`
  ${flexSort('space-between', 'center')}
  margin-bottom: 20px;
`;
const FacilityIcon = styled.span`
  display: ${({ available }) => (available ? 'inline-block' : 'none')};
  margin-right: 5px;
`;

const FacilityName = styled.span`
  display: flex;
  align-items: center;
  font-weight: ${({ available }) => (available ? 'bold' : 'normal')};
  margin-right: 5px;
`;

const CancellationText = styled.span`
  display: flex;
  align-items: center;
  text-decoration: line-through;
`;

const CancellationIcon = styled.span`
  margin-right: 5px;
`;

const Emoji = styled.span`
  margin-right: 5px;
`;
