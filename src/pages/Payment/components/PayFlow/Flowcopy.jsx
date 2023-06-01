import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { flexSort } from '../../../../styles/mixin';
import { secondsInDay } from 'date-fns';

const PayFlow = () => {
  const [nextRedirectPcUrl, setNextRedirectPcUrl] = useState('');
  const {
    productData,
    selectedZones,
    startDay,
    endDay,
    adultCount,
    babyCount,
    childCount,
    petCount,
    totalPrice,
  } = useSelector(state => state);
  const TOKEN = localStorage.getItem('token');

  // 날짜 계산하는 식
  const start = new Date(startDay).toISOString().split('T')[0];
  const startDate = new Date(new Date(start).getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const end = new Date(endDay).toISOString().split('T')[0];
  const endDate = new Date(new Date(end).getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const totalNights =
    endDay >= startDay
      ? Math.ceil((endDay - startDay) / (1000 * 60 * 60 * 24))
      : 0;
  // ----------------
  const { campName, region, address, thumbnail } = productData.data;
  const totalPeopleCount = adultCount + childCount + babyCount;
  const totalCampZone = selectedZones.map(zoneItem => zoneItem.campingZoneId);
  const zoneList = selectedZones.map(zoneItem => zoneItem.zoneName);
  const maxPeoples = selectedZones.reduce(
    (accumulator, zoneItem) => accumulator + Number(zoneItem.maxPeople),
    0
  );

  const payPrice = Number(totalPrice).toLocaleString();

  let readyPaprams = {
    cid: 'TC0ONETIME',
    partner_order_id: 'partner_order_id',
    partner_user_id: 'partner_user_id',
    item_name: campName,
    quantity: totalCampZone.length,
    total_amount: totalPrice,
    tax_free_amount: 0,
    approval_url: `http://localhost:3000/paying?totalMembers=${totalPeopleCount}&campingZoneId=${totalCampZone}&startDate=${startDate}&endDate=${endDate}&totalPrice=${totalPrice}
    `,
    fail_url: 'http://localhost:3000/payfail',
    cancel_url: 'http://localhost:3000/paycancel',
  };

  // useEffect(() => {
  //   axios
  //     .post('/v1/payment/ready', readyPaprams, {
  //       headers: {
  //         Authorization: 'KakaoAK edd72ff4d348df65098c647aaaddf5d3',
  //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       },
  //     })
  //     .then(res => {
  //       const {
  //         data: { next_redirect_pc_url },
  //       } = res;
  //       localStorage.setItem('tid', res.data.tid);
  //       setNextRedirectPcUrl(next_redirect_pc_url);
  //     });
  // }, []);

  return (
    <Container>
      <ViewBox>
        <ViewSection>
          <ProductInfo>
            <ProductTitle>상품정보</ProductTitle>
            <ProductBox>
              <ProductImg>
                <Img src={thumbnail} alt="캠핑장 사진" />
              </ProductImg>
              <CampInfoBox>
                <CampName>{campName}</CampName>
                <Adress>{address}</Adress>
                <Region>{region}</Region>
              </CampInfoBox>
            </ProductBox>
          </ProductInfo>
          <ReservationInfo>
            <ResevationTitle>예약정보</ResevationTitle>
            <ReservationInfoBox>
              <GuestInfo>
                <AdultBox>성인: {adultCount}</AdultBox>
                <ChildBox>어린이 : {childCount}</ChildBox>
                <BabyBox>유아 : {babyCount}</BabyBox>
              </GuestInfo>
              <ZoneBox>
                {zoneList.map(zone => {
                  return <ZoneInfo key={zone}>사이트 : {zone}</ZoneInfo>;
                })}
                <DayInfo>
                  {startDate} ~ {endDate} / {totalNights}박 {totalNights + 1}일
                </DayInfo>
              </ZoneBox>
            </ReservationInfoBox>
          </ReservationInfo>
          <PriceInfo>
            <PriceTitle>총 결제금액</PriceTitle>
            <TotalPrice>{payPrice}원</TotalPrice>
          </PriceInfo>
        </ViewSection>
        <PayBtn href={nextRedirectPcUrl}>결제하기</PayBtn>
      </ViewBox>
    </Container>
  );
};

export default PayFlow;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: sticky;
  top: 80px;
`;

const ViewBox = styled.div`
  ${flexSort('center', 'center')}
  flex-direction: column;
  gap: 12px;
  width: 323px;
  height: 100%;
  border: 1px solid ${props => props.theme.borderGrey};
  border-radius: 5px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

const ViewSection = styled.div`
  ${flexSort('center', 'center')}
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ProductInfo = styled.div`
  ${flexSort('center', 'start')}
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${props => props.theme.middleGrey};
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
`;

const ProductBox = styled.div`
  ${flexSort('center', 'center')}
  gap: 12px;
  padding: 24px 0;
  width: 100%;
`;

const ProductImg = styled.div`
  width: 100px;
  height: 120px;
`;

const Img = styled.img`
  width: 100px;
  height: 120px;
  border-radius: 12px;
`;

const CampInfoBox = styled.div`
  ${flexSort('start', 'start')}
  flex-direction: column;
  padding-top: 8px;
  width: 100%;
  height: 140px;
`;

const CampName = styled.p`
  font-size: 20px;
  line-height: 32px;
`;

const Adress = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

const Region = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

const ReservationInfo = styled.div`
  ${flexSort('center', 'start')}
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
  padding: 24px 0;
  border-bottom: 1px solid ${props => props.theme.middleGrey};
`;

const ResevationTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
`;

const ReservationInfoBox = styled.div`
  ${flexSort('center', 'start')}
  gap: 8px;
  flex-direction: column;
`;

const GuestInfo = styled.div`
  ${flexSort('center', 'start')}
  flex-direction: column;
`;

const AdultBox = styled.div`
  ${flexSort('center', 'center')}
  line-height: 1.4;
`;

const ChildBox = styled.div`
  ${flexSort('center', 'center')}
  line-height: 1.4;
`;

const BabyBox = styled.div`
  ${flexSort('center', 'center')}
  line-height: 1.4;
`;

const ZoneBox = styled.div`
  ${flexSort('center', 'start')}
  flex-direction: column;
`;

const ZoneInfo = styled.div`
  ${flexSort('center', 'center')}
  line-height: 1.4;
`;

const DayInfo = styled.div`
  ${flexSort('center', 'center')}
  line-height: 1.4;
`;

const PriceInfo = styled.div`
  ${flexSort('space-between', 'center')}
  padding: 20px 0;
  width: 100%;
  height: 100%;
`;

const PriceTitle = styled.p`
  font-size: 24px;
`;

const TotalPrice = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const PayBtn = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  background-color: ${props => props.theme.mainBlack};
  color: ${props => props.theme.white};
  border-radius: 12px;
  :hover {
    cursor: pointer;
  }
`;
