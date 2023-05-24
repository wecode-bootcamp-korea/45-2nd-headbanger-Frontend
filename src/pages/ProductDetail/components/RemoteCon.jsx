import React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
const RemoteCon = () => {
  return (
    <Container>
      <div>RemoteCon</div>
    </Container>
  );
};

export default RemoteCon;

const Container = styled.div`
  width: 323px;
  height: 508px;
  border: 1px solid ${theme.borderGrey};
`;
