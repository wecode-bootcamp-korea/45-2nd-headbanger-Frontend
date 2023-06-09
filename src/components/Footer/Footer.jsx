import React from 'react';
import styled from 'styled-components';
import { fontMix, flexSort } from '../../styles/mixin';
import Footertop from '../Footer/Footertop';

const Footer = () => {
  return (
    <FooterWrapper>
      <Footertop />
      <Info>
        <CompanyInfo>
          <p>서울시 강남구 테헤란로 427 위워크 타워</p>
          <br />
          <p>대표이사 : 이지은</p>
          <br />
          호스팅사업자: headbanger 대표이메일 : cvgmaster@czv.net ©headbanger
          CVG. All Rights Reserved
        </CompanyInfo>
      </Info>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  padding-top: 70px;
  z-index: 0;
`;

const Info = styled.div`
  ${fontMix(12, 'white')}
  ${flexSort('space-around', 'center')}
  background-color: ${props => props.theme.mainBlack};
  height: 150px;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const CompanyInfo = styled.div`
  padding-bottom: 5px;
  margin: 5px 0px 0px 10px;
  flex: 1;
`;
